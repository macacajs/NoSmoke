'use strict';

const Hooks = require('../../public/hooks').Hooks;
const ReporterTemplate = require('./reporterTemplate');

const hooks = new Hooks();
const _ = require('../common/helper');

let root = require('window-or-global');

root.updatePassedTestsCount = function () {
  if (root.mockData.stats.tests > root.mockData.stats.passes) {
    root.mockData.stats.passes++;
    root.mockData.stats.pending--;
  }
};

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = '';
  this.parent = null;
  this.type = 'normal'; //  'tab'/ 'normal'
  this.depth = 0;
  this.actions = []; // Units in {value : NSAppCrawlingTreeNodeAction}
  this.digest = null;
  this.reportSuite = null;
}

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.location = null;
  this.input = null;
  this.interval = 0;
  this.source = {};
}

NSAppCrawlingTreeNodeAction.prototype.title = function() {
  if (this.location) {
    let components = this.location.split(/[/]+/);
    if (components.length <= 4) {
      return components.join('-');
    } else {
      return components.slice(components.length - 4, components.length).join('-');
    }
  } else {
    return null;
  }
};

NSAppCrawlingTreeNodeAction.prototype.checkInterval = function () {
  this.previousTime = this.currentTime;
  this.currentTime = new Date();

  if (!this.previousTime) {
    this.previousTime = this.currentTime;
  }

  this.interval = this.currentTime.getTime() - this.previousTime.getTime();
};

NSAppCrawlingTreeNode.prototype.isFinishedBrowsing = function() {
  let isFinished = true;
  for (let key in this.actions) {
    if (this.actions[key].isTriggered === false) {
      isFinished = false;
      break;
    }
  }
  return isFinished;
};

NSAppCrawlingTreeNode.prototype.produceNodeActions = function(rawElements) {
  let actions = [];
  for (let index in rawElements) {
    let rawElement = rawElements[index];
    let action = new NSAppCrawlingTreeNodeAction();
    let shallowCopy = Object.assign({}, rawElement);
    delete shallowCopy.children;
    action.source = shallowCopy;
    action.location = shallowCopy.xpath;
    action.input = shallowCopy.input;
    actions.push(action);
  }

  return actions;
};

NSAppCrawlingTreeNode.prototype.checkDigest = function(platform, source) {
  if (!this.digest) {
    if (hooks.checkDigest(platform, source, this)) {
      return new Promise((resolve) => {
        resolve(this.digest);
      });
    } else {
      if (platform === 'ios') {
        return root.wdclient.send('/wd/hub/session/' + root.wdclient.sessionId + '/title', 'get', null, null)
          .then(title => {
            this.digest = title.value;
          });
      } else if (platform === 'pc-web') {
        return root.wdclient.send('/wd/hub/session/' + root.wdclient.sessionId + '/url', 'get', null, null)
          .then(title => {
            this.digest = title.value;
            this.url = this.digest;
          });
      } else {
        return new Promise((resolve, reject) => {
          this.digest = '' + (source.value.match(/node/g) || []).length +
            (source.value.match(/Android/g) || []).length +
            (source.value.match(/TextView/g) || []).length +
            (source.value.match(/EditText/g) || []).length +
            (source.value.match(/Layout/g) || []).length +
            (source.value.match(/Button/g) || []).length;
          resolve();
        });
      }
    }
  } else {
    return new Promise((resolve) => {
      resolve(this.digest);
    });
  }
};

NSAppCrawlingTreeNode.prototype.abbreviatedDigest = function() {
  if (this.digest) {
    let components = this.digest.split(/[.\-_/\\]+/);
    if (components.length <= 2 || this.digest.length < 20) {
      return components.join('-');
    } else {
      return components.slice(components.length - 4, components.length).join('-');
    }
  } else {
    return null;
  }
};

NSAppCrawlingTreeNode.prototype.updateReportData = function(crawler) {
  // empty case
  if (!this.reportSuite) {
    this.reportSuite = ReporterTemplate.suite();
    this.reportSuite.title = 'View: ' + this.abbreviatedDigest();
    this.reportSuite.uuid = `${_.uuid()}`;

    let shell = ReporterTemplate.suite();
    shell.uuid = _.uuid();
    shell.suites.push(this.reportSuite);
    this.reportSuite.context = this.fileName;
    root.mockData.suites.suites.push(shell);
  }

  // update total actions
  if (!this.reportSuite.tests.length) {
    this.reportSuite.totalPasses = 0;
    this.reportSuite.totalTests = 0;

    for (let i = 0; i < this.actions.length; i++) {
      let test = ReporterTemplate.test();
      test.title = this.actions[i].title();
      test.fullTitle = `View: ${this.abbreviatedDigest()}//${this.actions[i].title()}`;
      this.actions[i].bindedTest = test;
      this.reportSuite.tests.push(test);
      this.reportSuite.totalPasses++;
      this.reportSuite.totalTests++;
      root.mockData.stats.pending++;
      root.mockData.stats.tests++;
    }

    this.reportSuite.passes = this.reportSuite.tests;
  }

  if (crawler.currentAction &&
    crawler.currentAction.bindedTest &&
    crawler.currentAction.bindedTest.context.length === 0) {
    crawler.currentAction.checkInterval();
    crawler.currentAction.bindedTest.context = `${this.fileName}`;
    crawler.currentAction.bindedTest.pending = false;
    crawler.currentAction.bindedTest.pass = true;
    crawler.currentAction.bindedTest.state = 'passed';
    crawler.currentAction.bindedTest.duration = crawler.currentAction.interval;
    crawler.currentAction.bindedTest.code = JSON.stringify(crawler.currentAction, null, 2);
  }

  root.mockData.stats.suites = crawler.crawlingBuffer.length;
};

exports.NSAppCrawlingTreeNodeAction = NSAppCrawlingTreeNodeAction;
exports.NSAppCrawlingTreeNode = NSAppCrawlingTreeNode;
