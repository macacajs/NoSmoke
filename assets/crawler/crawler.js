'use strict';

let root = require('window-or-global');
let utils = require('../utils');

const {
  NSAppCrawlingTreeNodeAction,
  NSAppCrawlingTreeNode
} = require('./models');

function NSCrawler(config, sessionId) {
  this.config = config;                             // Config in format of NSCrawlerConfig
  this.sessionId = sessionId;                       // Session Id
  this.crawlingBuffer = [];                         // The set of notes
  this.currentNode = null;                          // Current node which is in crawling
  this.repeatingCrawlingCount = 0;                  // When exceed 3, whole program exists
  this.crawlingExpires = false;                     // Flag to indicate whether a crawling expires
}

NSCrawler.prototype.initialize = function() {
  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.testingPeriod * 1000);
  return this;
};

NSCrawler.prototype.crawl = function () {

  // Terminate under the following cases:
  // 1. the previous node has been finished for continuously count of 5, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= 5 || this.crawlingExpires) {
    console.log('-----> Crawling Finished <-----');
    return;
  }

  root.wdclient.send(`/wd/hub/session/` +this.sessionId + `/dismiss_alert`, 'post', {}, null).then(() => {
    root.wdclient
      .send(`/wd/hub/session/` + this.sessionId + `/source`, `get`, null, null)
      .then((data)  => {
        this.explore(data);
      });
  });
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();
  node.checkDigest(this.config.platform ,source).then(() => {
    // 1. Check if there is an existing node
    for (let index in this.crawlingBuffer) {
      if(this.crawlingBuffer[index] && this.crawlingBuffer[index].digest === node.digest) {
        this.currentNode = this.crawlingBuffer[index];
        if (this.currentNode.isFinishedBrowseing()) {
          if (this.currentNode.parent.type == 'tab') {
            this.currentNode = this.currentNode.parent;
            this.performAction(this.currentNode.actions);
          } else {
            this.repeatingCrawlingCount++;
            root.wdclient.send(`/wd/hub/session/` + this.sessionId + `/back`, 'post', {}, null).then(() => {
              this.crawl();
            });
          }
        } else {
          this.performAction(this.currentNode.actions);
          setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
        }
        return;
      }
    }

    this.repeatingCrawlingCount = 0;

    node.depth = this.currentNode? this.currentNode.depth + 1 : 0;
    // 2. Check if already reached the max depth, if so, fallback
    if (node.depth >= this.config.testingDepth) {
      root.wdclient.send(`/wd/hub/session/` + this.sessionId + `/back`, 'post', {}, null).then(() => {
        this.crawl();
      });
      return;
    }

    // 3. Initialize an new node
    node.parent = this.currentNode;
    this.currentNode = node;

    let matches = this.recursiveFilter(JSON.parse(source.value), this.config.targetElements, this.config.exclusivePattern);
    if (matches.length) {
      this.currentNode.actions = this.produceNodeActions(matches);
    } else {
      let elements = this.recursiveFilter(JSON.parse(source.value), null, this.config.exclusivePattern);
      this.currentNode.actions = this.produceNodeActions(elements);
    }

    if (this.currentNode.actions.length > this.config.maxActionPerPage) {
      this.currentNode.actions = this.currentNode.actions.slice(0,this.config.maxActionPerPage+1);
    }

    this.currentNode.sortActionPriority();
    this.crawlingBuffer.push(node);
    this.performAction(this.currentNode.actions);
    setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
  });
}

NSCrawler.prototype.refreshScreen = function () {

  console.log('check if is node runtime: ' + utils.isNodeRuntime());
  console.log('check if is web runtime: ' + utils.isWebRuntime());

  if (utils.isWebRuntime()) {
    root.wdclient.send(`/wd/hub/session/`+ this.sessionId +`/screenshot`, 'get', null, function(data) {
      let base64 = `data:image/jpg;base64,`+data.value;
      $('#screen').attr('src', base64);
    });
  } else {
    // const filepath = path.join(__dirname, '..', 'screenshots', `${_.uuid()}.png`);
    // const reportspath = path.join(__dirname, '..', 'reports');
    // _.mkdir(path.dirname(filepath));
    //
    // return this
    //   .saveScreenshot(filepath)
    //   .then(() => {
    //     appendToContext(context, `${path.relative(reportspath, filepath)}`);
    //   });
  }
};

NSCrawler.prototype.insertTabNode = function (rawElement) {
  if (this.currentNode.parent.type != 'tab') {
    // If the parent is already a tab, ignore this data
    let node = new NSAppCrawlingTreeNode();
    node.actions = this.produceNodeActions(rawElement);
    node.parent = this.currentNode.parent;
    node.type = 'tab';
    node.digest = JSON.stringify(rawElement);
    this.currentNode.parent = node;
  }
}

NSCrawler.prototype.produceNodeActions = function(rawElements) {
  let actions = [];
  for (let index in rawElements) {
    let rawElement = rawElements[index];
    let action = new NSAppCrawlingTreeNodeAction();
    action.source = rawElement;
    action.location = rawElement.xpath;
    action.input = rawElement.input;
    actions.push(action);
  }
  return actions;
};

exports.NSCrawler = NSCrawler;
