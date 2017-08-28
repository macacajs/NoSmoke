'use strict';

let utils = require('../utils');

let root = require('window-or-global');

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
  // 1. the previous node has been finished for continuously count of 8, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= 8 || this.crawlingExpires) {
    console.log('-----> Crawling Finished <-----');
    return;
  }

  // root.wdclient.send(`/wd/hub/session/` +this.sessionId + `/dismiss_alert`, 'post', {}, null).then(() => {
  //
  // });
  root.wdclient
    .send(`/wd/hub/session/` + this.sessionId + `/source`, `get`, null, null)
    .then((data)  => {
      this.explore(data);
    });
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();
  node.checkDigest(this.config.platform ,source).then(() => {

    /** 1. check if there is an existing node */
    for (let index in this.crawlingBuffer) {
      if(this.crawlingBuffer[index] && this.crawlingBuffer[index].digest === node.digest) {
        this.currentNode = this.crawlingBuffer[index];
        /** 1.1 check if finished browseing */
        if (this.currentNode.isFinishedBrowseing()) {
          /** 1.1 if finished browseing, divide into two condition below */
          if (this.currentNode.parent && this.currentNode.parent.type == 'tab') {
            /** 1.1.1 if finished browseing, and the current one is under a control widget, trigger the control widget */
            this.currentNode = this.currentNode.parent;
            this.performAction(this.currentNode.actions);
            setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
          } else {
            /** 1.1.2 if finished browseing, and the current one is originates from a normal view, trigger back and then crawl again*/
            this.repeatingCrawlingCount++;
            root.wdclient.send(`/wd/hub/session/` + this.sessionId + `/back`, 'post', {}, null).then(() => {
              this.crawl();
            });
          }
        } else {
          /** 1.1 if not finish crawling, crawling on current node*/
          this.performAction(this.currentNode.actions);
          setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
        }
        /** 1.2 for existing node, avoid creating new node and quit */
        return;
      }
    }

    this.repeatingCrawlingCount = 0;

    /** 2. check if already reached the max depth, if so, fallback */
    node.depth = this.currentNode? this.currentNode.depth + 1 : 0;
    if (node.depth >= this.config.testingDepth) {
      root.wdclient.send(`/wd/hub/session/` + this.sessionId + `/back`, 'post', {}, null).then(() => {
        this.crawl();
      });
      return;
    }

    /** 3. initialize an new node */
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

    this.crawlingBuffer.push(node);
    this.performAction(this.currentNode.actions);
    setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
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
  if ((exclusive) && ((source.value && exclusive.includes(source.value)) ||
      (source.name && exclusive.includes(source.name)) ||
      (source.text && exclusive.includes(source.text)) ||
      (source['content-desc'] && exclusive.includes(source['content-desc'])) ||
      (source.label && exclusive.includes(source.label)))) {
    return [];
  }

  this.eraseModelDifference(source);

  /** 1. filter Current Node Information */
  if (source.hasOwnProperty('children')) {
    if (utils.isArray(source.children)) {
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
      if ((source.value && source.value === matches[match].searchValue) ||
        (source.name && source.name === matches[match].searchValue) ||
        (source.text && source.text === matches[match].searchValue) ||
        (source.label && source.label === matches[match].searchValue)) {
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
      }
    }
  }

  return sourceArray;
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
  }
}

NSCrawler.prototype.refreshScreen = function () {
  /** Based on environment, choose the way of refresh screen */
  let that = this;
  root.wdclient.send(`/wd/hub/session/`+ this.sessionId +`/screenshot`, 'get', null, function(data) {
    if (utils.isWebRuntime()) {
      let base64 = `data:image/jpg;base64,` + data.value;
      document.getElementById('screen').setAttribute('src', base64);
    } else {
      data.currentNode = that.currentNode;
      root.eventEmmiter.emitEvent('onScreenRefresh',[data]);
    }
  });
};

NSCrawler.prototype.insertTabNode = function (rawElement) {
  /** when find a control widget in source structure, call this method to update the node hierachy */
  let node = new NSAppCrawlingTreeNode();
  node.actions = this.produceNodeActions(rawElement);
  node.type = 'tab';
  node.digest = JSON.stringify(rawElement);

  /** check: if there is a similar node in the parent chain, avoid */
  let parentNode = this.currentNode.parent;
  while (parentNode) {
    if (parentNode.digest == node.digest) {
      console.log('similar tab elements in parent, abort');
      return;
    }
    parentNode = parentNode.parent;
  }

  node.parent = this.currentNode.parent;
  this.currentNode.parent = node;
  this.crawlingBuffer.push(node);
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
  return actions;
};

exports.NSCrawler = NSCrawler;