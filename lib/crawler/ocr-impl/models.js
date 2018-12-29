'use strict';

const ReporterTemplate = require('../reporterTemplate');
const _ = require('../../common/helper');
let root = require('window-or-global');
const utf8 = require('utf8');

/* Test suite control */
root.updatePassedTestsCount = function () {
  if (root.mockData.stats.tests > root.mockData.stats.passes) {
    root.mockData.stats.passes++;
  }

  if (root.mockData.stats.pending > 0) {
    root.mockData.stats.pending--;
  }
};

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = '';           // - not in use -
  this.parent = null;       // parent node
  this.type = 'normal';     // - not in use - for source type strategy only
  this.depth = 0;           // depth in parent
  this.actions = [];        // user actions
  this.digest = null;       // digest of current node
  this.reportSuite = null;  // testing report suite
  this.repeatable = false;  // whether the action in current node can repeat, true for user defined action
  this.text = '';           // used for ocr mode
}

function NSAppCrawlingTreeNodeActionLocation() {
  this.origin = {
    x: 0.0,
    y: 0.0
  };
  this.size = {
    w: 0.0,
    h: 0.0
  };
}

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.location = new NSAppCrawlingTreeNodeActionLocation();     // source strategy: xpath;  ocr strategy: location in view (NSAppCrawlingTreeNodeActionLocation);
  this.input = null;        // - not in use - for source type strategy only
  this.interval = 0;        // test duration interval
  this.source = {};         // - not in use - for source type strategy only
  this.name = '';           // name
  this.repeatable = false;
}

NSAppCrawlingTreeNodeAction.prototype.title = function() {
  return utf8.encode(`${this.location.origin.x}-${this.location.origin.y}`);
};

NSAppCrawlingTreeNodeAction.prototype.markActionStart = function (crawler) {
  this.previousTime = new Date();
};

NSAppCrawlingTreeNodeAction.prototype.markActionFinish = function (crawler, fileName) {
  this.currentTime = new Date();
  this.interval = this.currentTime.getTime() - this.previousTime.getTime();

  // update report data
  if (this.bindedTest &&
    this.bindedTest.state !== 'passed') {
    this.bindedTest.context = `${fileName}` || null;
    this.bindedTest.pending = false;
    this.bindedTest.pass = true;
    this.bindedTest.state = 'passed';
    this.bindedTest.duration = crawler.currentAction.interval;
    this.bindedTest.code = '';
  }
};

NSAppCrawlingTreeNode.prototype.isFinishedBrowsing = function() {
  // check for ordinary nodes, whether current action has been finished
  let isFinished = true;
  for (let key in this.actions) {
    if (this.actions[key].isTriggered === false) {
      isFinished = false;
      break;
    }
  }

  // special case for repeatable nodes
  if (isFinished && this.repeatable === true) {
    for (let key in this.actions) {
      this.actions[key].isTriggered = false;
    }

    isFinished = false;
  }

  return isFinished;
};

NSAppCrawlingTreeNode.prototype.produceNodeActions = function(rawElements) {
  let actions = [];
  for (let index = 0; index < rawElements.length; index++) {
    let rawElement = rawElements[index];
    let action = new NSAppCrawlingTreeNodeAction();
    let shallowCopy = Object.assign({}, rawElement);
    action.location = shallowCopy.location;
    action.input = shallowCopy.input;
    action.name = utf8.encode(shallowCopy.name || '');
    action.repeatable = shallowCopy.repeatable;
    actions.push(action);
  }

  return actions;
};

NSAppCrawlingTreeNode.prototype.checkDigest = function(platform, source, crawler) {
  // assign to the full text body of the source, and then conduct similarity tests
  return source.text;
};

NSAppCrawlingTreeNode.prototype.abbreviatedDigest = function() {
  if (this.actions.length === 0) {
    console.log('crawling on empty content');
    return 'unknown';
  }

  return this.actions.reduce((accumulator, currentAction, index) => {
    if (index === 1) {
      return `${this.actions[0].name}_${currentAction.name}`;
    } else {
      return `${accumulator}_${currentAction.name}`;
    }
  });
};

NSAppCrawlingTreeNode.prototype.checkAndInitReportDataIfNeeded = function (crawler) {
  // empty case
  if (!this.reportSuite) {
    this.reportSuite = ReporterTemplate.suite();
    this.reportSuite.title = 'View: ';
    this.reportSuite.uuid = `${_.uuid()}`;

    let shell = ReporterTemplate.suite();
    shell.uuid = _.uuid();
    shell.suites.push(this.reportSuite);
    shell.title = 'View: ';
    this.reportSuite.context = this.fileName || null;
    root.mockData.suites.suites.push(shell);
  }

  // update total actions
  if (!this.reportSuite.tests.length) {
    this.reportSuite.totalPasses = 0;
    this.reportSuite.totalTests = 0;

    for (let i = 0; i < this.actions.length; i++) {
      let test = ReporterTemplate.test();
      test.title = this.actions[i].title();
      test.fullTitle = 'View: ';
      this.actions[i].bindedTest = test;
      this.reportSuite.tests.push(test);
      this.reportSuite.totalPasses++;
      this.reportSuite.totalTests++;
      root.mockData.stats.pending++;
      root.mockData.stats.tests++;
    }

    this.reportSuite.passes = this.reportSuite.tests;
  }

  root.mockData.stats.suites = crawler.crawlingBuffer.length;
};

exports.NSAppCrawlingTreeNodeAction = NSAppCrawlingTreeNodeAction;
exports.NSAppCrawlingTreeNode = NSAppCrawlingTreeNode;
