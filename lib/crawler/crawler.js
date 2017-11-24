'use strict';

const Hooks = require('../../public/hooks').Hooks;
const hooks = new Hooks();
const root = require('window-or-global');
const path = require('path');
const fs = require('fs');
const _ = require('../common/helper');

const maxRepeatCrawlingCount = 8;

const {
  NSAppCrawlingTreeNodeAction,
  NSAppCrawlingTreeNode
} = require('./models');

function NSCrawler(config, sessionId) {
  this.config = config;
  this.sessionId = sessionId;
  this.crawlingBuffer = [];
  this.currentNode = null;
  this.currentAction = null;
  this.repeatingCrawlingCount = 0;
  this.crawlingExpires = false;
}

NSCrawler.prototype.initialize = function() {
  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.testingPeriod * 1000);
  return this;
};

NSCrawler.prototype.crawl = function () {
  // Terminate under the following cases:
  // 1. the previous node has been finished for continuously count of 8, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= maxRepeatCrawlingCount || this.crawlingExpires) {
    console.log('-----> Crawling Finished <-----');
    root.eventEmmiter.emit('terminateCrawling');
    return;
  }

  root.wdclient
    .send('/wd/hub/session/' + this.sessionId + '/source', 'get', null, null)
    .then((data) => {
      this.beforeExplore(data);
    });
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();

  node.checkDigest(this.config.platform, source).then(() => {

    /** 1. check if there is an existing node */
    for (let index in this.crawlingBuffer) {
      if (this.crawlingBuffer[index] && this.crawlingBuffer[index].digest === node.digest) {
        this.currentNode = this.crawlingBuffer[index];
        /** 1.1 check if finished browsing */
        if (this.currentNode.isFinishedBrowsing()) {
          /** 1.1.1 if finished browsing, divide into two condition below */
          if (this.currentNode.parent && this.currentNode.parent.type === 'tab') {
            if (this.currentNode.parent.isFinishedBrowsing()) {
              /** 1.1.1.1 if the tab control also finishes, press - */
              this.back();
              return;
            } else {
              /** 1.1.1.2 if finished browsing, and the current one is under a control widget, trigger the control widget */
              this.currentNode = this.currentNode.parent;
              this.performAction(this.currentNode.actions).then(() => {
                this.crawl();
              });
            }
          } else {
            /** 1.1.2 if finished browsing, and the current one is originates from a normal view, trigger back and then crawl again*/
            this.repeatingCrawlingCount++;
            if (this.currentNode.depth === 0) {
              /** 1.1.2.1 if depth is 0 , then terminate crawling, avoid further navigate back */
              this.repeatingCrawlingCount = maxRepeatCrawlingCount;
              this.crawl();
            } else {
              /** 1.1.2.2 if depth is not 0, then back and further explore */
              this.back();
            }
          }
        } else {
          /** 1.2 if not finish crawling, crawling on current node*/
          this.performAction(this.currentNode.actions).then(() => {
            this.crawl();
          });
        }
        /** for existing node, avoid creating new node and quit */
        return;
      }
    }

    this.repeatingCrawlingCount = 0;

    /** 2. check if already reached the max depth, if so, fallback */
    node.depth = this.currentNode ? this.currentNode.depth + 1 : 0;
    if (node.depth >= this.config.testingDepth) {
      this.back();
      return;
    }

    /** 3. initialize an new node */
    node.parent = this.currentNode;
    this.currentNode = node;

    let matches = this.recursiveFilter(this.config.platform === 'pc-web' ? source.value : JSON.parse(source.value),
      this.config.targetElements, this.config.exclusivePattern);

    if (matches.length) {
      this.currentNode.actions = this.produceNodeActions(matches);
    } else {
      let elements = this.recursiveFilter(this.config.platform === 'pc-web' ? source.value : JSON.parse(source.value),
        null, this.config.exclusivePattern);
      this.currentNode.actions = this.produceNodeActions(elements);
    }

    if (this.currentNode.actions.length > this.config.maxActionPerPage) {
      this.currentNode.actions = this.currentNode.actions.slice(0, this.config.maxActionPerPage + 1);
    }

    this.crawlingBuffer.push(node);
    this.performAction(this.currentNode.actions).then(() => {
      this.crawl();
    });
  });
};

NSCrawler.prototype.back = function () {
  root.wdclient.send('/wd/hub/session/' + this.sessionId + '/back', 'post', {}, null).then(() => {
    this.refreshScreen();
    this.crawl();
  });
};

// If match is null or empty, put all elements which belongs to button, label,
NSCrawler.prototype.recursiveFilter = function (source, matches, exclusive) {

  /** 0. check crawling validity, erase difference between muli-platforms */
  // filter out nav-bar element, avoid miss back operation
  let sourceArray = [];
  if (this.config.exclusiveTypes.indexOf(source.type) >= 0) {
    return [];
  }

  // if the source value/name/label matches the exclusive pattern, avoid recording
  if (exclusive && (source.value && exclusive.includes(source.value)) ||
      source.name && exclusive.includes(source.name) ||
      source.text && exclusive.includes(source.text) ||
      source['content-desc'] && exclusive.includes(source['content-desc']) ||
      source.label && exclusive.includes(source.label)) {
    return [];
  }

  this.eraseModelDifference(source);

  /** 1. filter Current Node Information */
  if (source.hasOwnProperty('children')) {
    if (Array.isArray(source.children)) {
      for (let i = 0; i < source.children.length; i++) {
        this.eraseModelDifference(source.children);
        this.insertXPath(source, source.children[i]);
        let result = this.recursiveFilter(source.children[i], matches, exclusive);
        sourceArray = sourceArray.concat(result);
      }
    } else {
      this.eraseModelDifference(source.children);
      this.insertXPath(source, source.children);
      let result = this.recursiveFilter(source.children, matches, exclusive);
      sourceArray = sourceArray.concat(result);
    }
  }

  /** 2. check if current source is a tab-controller widget */
  if (this.config.tabBarTypes.indexOf(source.type) >= 0 && sourceArray.length > 0) {
    // Check if sourceType is tab, put it in a high priority list
    this.insertTabNode(sourceArray);
    return [];
  }

  /** 3. filter current node information */
  if (matches) {
    // Explicit mode
    for (let match in matches) {
      if (source.value && source.value === matches[match].searchValue ||
        source.name && source.name === matches[match].searchValue ||
        source.text && source.text === matches[match].searchValue ||
        source['content-desc'] && source['content-desc'] === matches[match].searchValue ||
        source.label && source.label === matches[match].searchValue) {
        source.input = matches[match].actionValue;
        return [source];
      }
    }
  } else if (source.type) {
    if (this.checkElementValidity(source)) {
      if (this.config.clickTypes.indexOf(source.type) >= 0) {
        sourceArray.push(source);
      } else if (this.config.editTypes.indexOf(source.type) >= 0) {
        source.input = 'random+123';
        sourceArray.push(source);
      } else if (this.config.horizontalScrollTypes.indexOf(source.type) >= 0) {
        sourceArray.push(source);
      }
    }
  }

  return sourceArray;
};

NSCrawler.prototype.performAction = function(actions) {
  let action = null;
  for (let i = 0; i < actions.length; i++) {
    let candidate = actions[i];
    if (!candidate.isTriggered) {
      candidate.isTriggered = true;

      /** log and only log in the current progress */
      this.currentAction = candidate;
      this.currentAction.checkInterval();
      this.refreshScreen();
      root.updatePassedTestsCount();
      console.log(JSON.stringify(candidate.source));

      action = candidate;
      break;
    }
  }

  if (!action) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  return root.wdclient
    .send('/wd/hub/session/' + this.sessionId + '/source', 'get', null, null)
    .then(() => {
      return new Promise((resolve, reject) => {
        /** conduct action based on configurable types */
        root.wdclient
          .send('/wd/hub/session/' + this.sessionId + '/element', 'post', {
            using: 'xpath',
            value: action.location
          }, null)
          .then(data => {
            action.data = data;
            resolve(action);
          });
      });
    })
    .then(() => {
      if (action.data.status === 0) {
        /** 0. invoke interceptor **/
        let customizedAction = hooks.performAction(action, this);
        if (customizedAction) {
          return customizedAction;
        }

        if (this.config.clickTypes.indexOf(action.source.type) >= 0) {
          /** 1. handle click actions */
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + this.sessionId + '/element/' + action.data.value.ELEMENT + '/click', 'post', {}, () => {
              this.refreshScreen();
              resolve();
            });
          });
        } else if (this.config.horizontalScrollTypes.indexOf(action.source.type) >= 0) {
          /** 2. handle horizontal scroll actions */
          return new Promise((resolve, reject) => {
            root.wdclient.send('/wd/hub/session/' + this.sessionId + '/actions', 'post', {'actions': [{'type': 'drag', 'fromX': 300, 'fromY': 200, 'toX': 10, 'toY': 200, 'duration': 2}]},
              () => {
                this.refreshScreen();
                resolve();
              });
          });
        } else if (this.config.editTypes.indexOf(action.source.type) >= 0) {
          /** 3. handle edit actions */
          return new Promise((resolve, reject) => {
            root.wdclient
              .send('/wd/hub/session/' + this.sessionId + '/element/' + action.data.value.ELEMENT + '/value', 'post', {
                'value': [action.input]
              }, () => {
                this.refreshScreen();
                resolve();
              });
          });
        }
      } else {
        console.log('invalid data : ' + JSON.stringify(action.data));
        return 'invalid data';
      }
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        hooks.afterActionPerformed(action, this, resolve);
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, this.config.newCommandTimeout * 1000);
      });
    });
};

NSCrawler.prototype.beforeExplore = function (source) {
  return this.explore(source);
};

NSCrawler.prototype.checkElementValidity = function (source) {
  return true;
};

NSCrawler.prototype.eraseModelDifference = function (source) {
  // erase out difference between platforms
  if (this.config.platform === 'android') {
    if (source.class) {
      source.type = source.class;
    }
    if (source.node) {
      source.children = source.node;
    }
  } else if (this.config.platform === 'pc-web') {
    if (source.name) {
      source.type = source.name;
    }
  }
};

NSCrawler.prototype.refreshScreen = function (currentAction) {
  /** Based on environment, choose the way of refresh screen */
  let that = this;
  root.wdclient.send('/wd/hub/session/' + this.sessionId + '/screenshot', 'get', null, function(data) {

    const screenshootsDir = path.join(__dirname, '..', '..', 'screenshoots');
    const fileName = `${_.uuid()}.png`;
    const fileDir = path.join(screenshootsDir, fileName);

    _.mkdir(screenshootsDir);
    fs.writeFileSync(fileDir, data.value, 'base64');

    data.fileDir = fileDir;
    data.fileName = fileName;
    data.currentNode = that.currentNode;
    data.currentNode.fileName = fileName;
    data.currentNode.updateReportData(that);
    root.eventEmmiter.emit('screenRefresh', data);
  });
};

NSCrawler.prototype.insertTabNode = function (rawElement) {
  if (!hooks.insertTabNode(rawElement, this)) {
    /** when find a control widget in source structure, call this method to update the node hierachy */
    let node = new NSAppCrawlingTreeNode();
    node.actions = this.produceNodeActions(rawElement);
    node.type = 'tab';
    node.depth = this.currentNode.depth;
    node.digest = '';
    for (let i = 0; i < node.actions; i++) {
      node.digest = node.digest + '_' + node.actions[i].location;
    }

    /** check: if there is a similar node in the parent chain, avoid */
    let parentNode = this.currentNode.parent;
    while (parentNode) {
      if (parentNode.digest === node.digest) {
        console.log('similar tab elements in parent, abort');
        return;
      }
      parentNode = parentNode.parent;
    }

    node.parent = this.currentNode.parent;
    node.reportSuite = node.parent.reportSuite;
    this.currentNode.parent = node;
    this.crawlingBuffer.push(node);
  }
};

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

  return hooks.sortActionPriority(actions, this);
};

exports.NSCrawler = NSCrawler;
