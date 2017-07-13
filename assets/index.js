'use strict';

const _ = require('./utils');
const WDClient = require('./wd-client');

/*
function WDClient(options) {
  this.server = options.server;
  this.init();
}

let sessionId = null;
let crawlerConfig = new NSCrawlerConfig();

WDClient.prototype.init = function() {
  let that = this;
  console.log(this.server);
  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      // app: '~/.macaca-temp/ios-app-bootstrap.app'
      app: ''
    }
  }, function(data) {
    sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      let base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });

    // Start crawling
    let crawler = new NSCrawler(crawlerConfig, sessionId).initialize();
    setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
  });
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json();
  }
  if (method.toLowerCase() === 'post') {
    return fetch(`${this.server}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
        return data;
      });
  } else {
    return fetch(`${this.server}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(parseJSON)
      .then(function(data) {
        if (callback) {
          callback(data);
        }
        return data;
      });
  }
};
*/
window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

/** ----------------------------------------  AppCrawler Implementation: 1. Modeling  ----------------------------------------- **/

/** Crawling Action Target  */
var NSTargetActionType = {
  CLICK: 1,
  INPUT: 2,
  SWIPE: 3,
  NAVIGATE: 4
};

var NSTargetSearchType = {
  XPath: 1,
  Value: 2,
  Identifier: 3
};

function NSTargetElement() {
  this.searchMethod = NSTargetSearchType.Value;   // Searchable via XPath, Value, Identifier
  this.searchValue = null;                        // Search value, value of XPath, Value & Identifier
  this.actionType  = NSTargetActionType.CLICK;
  this.actionPerformTimes = 1;
  this.actionValue = null;
}

/** Crawling Config  */
function NSCrawlerConfig() {
  this.testingPeriod = 0.5 * 60 * 60;
  this.testingDepth = 16;
  this.takeScreenShot = true;
  this.autoCancelAlert = true;
  this.newCommandTimeout = 3;
  this.launchTimeout = 6;
  this.maxActionPerPage = 100;
  this.navigationBackKeyword =[];
  this.targetElements = {};
  this.exclusivePattern = '';
  this.platform = 'iOS';
}

NSCrawlerConfig.prototype.debugDesriptoin =  function() {
  return 'newCommandTimeout: ' + this.newCommandTimeout + '\n' +
    'testingDepth: ' + this.testingDepth + '\n' +
    'takeScreenShot: ' + this.takeScreenShot+ '\n' +
    'autoCancelAlert: ' + this.autoCancelAlert+ '\n' +
    'launchTimeout: ' + this.launchTimeout+ '\n' +
    'targetElements: ' + this.targetElements+ '\n';
};

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = '';       // Unique path which leads to current page
  this.parent = null;   // Parent ui element
  this.actions = [];    // Units in {value : NSAppCrawlingTreeNodeAction}
  this.digest = null;
}

/*
NSAppCrawlingTreeNode.prototype.isFinishedBrowseing = function() {
  let isFinished = true;
  for (let key in this.actions) {
    if (this.actions[key].isTriggered === false) {
      isFinished = false;
      break;
    }
  }
  return isFinished;
};
NSAppCrawlingTreeNode.prototype.sortActionPriority = function() {
  this.actions.sort((a , b) => {
    if (a.location.includes('TabBar') && !b.location.includes('TabBar')) {
      return 1;
    } else if (!a.location.includes('TabBar') && b.location.includes('TabBar')) {
      return -1;
    } else {
      return 0;
    }
  });
};


NSAppCrawlingTreeNode.prototype.checkDigest = function() {
  if (this.digest == null) {
    return window.wdclient.send(`/wd/hub/session/${sessionId}/title`,`get`, null, null)
      .then(title  => {
        this.digest = title.value;
      });
  } else {
    return new Promise((resolve) => {
      resolve(this.digest);
    });
  }
};

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.location = null;
  this.input = null;
  this.source = {};
}

NSAppCrawlingTreeNodeAction.prototype.desription = function() {

};

function NSCrawler(config, sessionId) {
  this.config = config;                     // Config in format of NSCrawlerConfig
  this.sessionId = sessionId;                  // Session Id
  this.crawlingBuffer = [];                         // The set of notes
  this.currentNode = null;                       // Current node which is in crawling
  this.repeatingCrawlingCount = 0;                  // When exceed 3, whole program exists
  this.crawlingExpires = false;                     // Flag to indicate whether a crawling expires
}

NSCrawler.prototype.initialize = function() {

  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.testingPeriod * 1000);
  return this;
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();
  node.checkDigest().then(() => {
    // 1. Check if there is an existing node
    for (let index in this.crawlingBuffer) {
      if(this.crawlingBuffer[index] && this.crawlingBuffer[index].digest === node.digest) {
        this.currentNode = this.crawlingBuffer[index];
        // Check about current node related
        if (this.currentNode.isFinishedBrowseing()) {
          // Perform 'back' and craw again
          this.repeatingCrawlingCount++;
          window.wdclient.send(`/wd/hub/session/${sessionId}/back`, 'post', {}, null).then(() => {
            this.crawl();
          });
        } else {
          this.performAction();
          setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
        }
        return;
      }
    }

    this.repeatingCrawlingCount = 0;

    // 2. Initialize an new node
    node.parent = this.currentNode;
    this.currentNode = node;

    let matches = recursiveFilter(JSON.parse(source.value), this.config.targetElements, this.config.exclusivePattern);
    if (matches.length) {
      this.currentNode.actions = produceNodeActions(matches);
    } else {
      let elements = recursiveFilter(JSON.parse(source.value), null, this.config.exclusivePattern);
      this.currentNode.actions = produceNodeActions(elements);
    }

    if (this.currentNode.actions.length > this.config.maxActionPerPage) {
      this.currentNode.actions = this.currentNode.actions.slice(0,this.config.maxActionPerPage+1);
    }

    this.currentNode.sortActionPriority();
    this.crawlingBuffer.push(node);
    this.performAction();
    setTimeout(this.crawl.bind(this), this.config.newCommandTimeout * 1000);
  });
};

// Perform Node Actions
NSCrawler.prototype.performAction = function() {
  let that = this;
  window.wdclient
    .send(`/wd/hub/session/${sessionId}/source`, `get`, null, null)
    .then(() => {
      for (let i = 0; i < that.currentNode.actions.length; i++) {
        let action = that.currentNode.actions[i];
        if (!action.isTriggered) {
          action.isTriggered = true;
          console.log(JSON.stringify(action.source));

          window.wdclient
            .send(`/wd/hub/session/${sessionId}/element`, `post`, {
              using: 'xpath',
              value: action.location
            }, null)
            .then(data => {
              if (data.status === 0) {
                switch (action.source.type) {
                  case 'Button':
                  case 'Cell':
                    window.wdclient
                      .send(`/wd/hub/session/${sessionId}/actions`, `post`, {
                        actions: [{
                          type: 'tap',
                          x: action.source.rect.x,
                          y: action.source.rect.y
                        }]
                      }, null)
                      .then(() => {
                        refreshScreen();
                      });
                    break;
                  case 'PageIndicator':
                    window.wdclient
                      .send(`/wd/hub/session/${sessionId}/dragfromtoforduration`,`post`, {
                        fromX: 10,
                        fromY: 200,
                        toX: 300,
                        toY: 200,
                        duration: 2.00
                      }, null)
                      .then(() => {
                        refreshScreen();
                      });
                    break;
                  case 'TextField':
                  case 'SecureTextField':
                    window.wdclient
                      .send(`/wd/hub/session/${sessionId}/element/${data.value.ELEMENT}/value`,`post`, {
                        'value': [action.input]
                      }, null)
                      .then(() => {
                        refreshScreen();
                      });
                    break;
                  default:
                    break;
                }
              }
            });
          return;
        }
      }
    });
};

NSCrawler.prototype.crawl = function () {

  // Terminate under the following cases:
  // 1. the previous node has been finished for continuously count of 5, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= 5 || this.crawlingExpires) {
    console.log('-----> Crawling Finished <-----');
    return;
  }

  window.wdclient.send(`/wd/hub/session/${sessionId}/dismiss_alert`, 'post', {}, null).then(() => {
    window.wdclient
      .send(`/wd/hub/session/${sessionId}/source`, `get`, null, null)
      .then((data)  => {
        this.explore(data);
      });
  });
};

// Login configuration
let loginAccount = new NSTargetElement();
let loginPassword = new NSTargetElement();
let loginButton = new NSTargetElement();

loginAccount.actionType = NSTargetActionType.INPUT;
loginAccount.searchValue = 'please input username';
loginAccount.actionValue = '中文+Test+12345678';

loginPassword.actionType = NSTargetActionType.INPUT;
loginPassword.searchValue = 'please input password';
loginPassword.actionValue = '111111';

loginButton.actionType = NSTargetActionType.CLICK;
loginButton.searchValue = 'Login';

crawlerConfig.targetElements[loginAccount.searchValue] = loginAccount;
crawlerConfig.targetElements[loginPassword.searchValue] = loginPassword;
crawlerConfig.targetElements[loginButton.searchValue] = loginButton;

crawlerConfig.navigationBackKeyword.push('返回');
crawlerConfig.navigationBackKeyword.push('取消');
crawlerConfig.exclusivePattern = crawlerConfig.exclusivePattern.concat('_').concat('pushView');
crawlerConfig.exclusivePattern = crawlerConfig.exclusivePattern.concat('_').concat('popView');
crawlerConfig.exclusivePattern = crawlerConfig.exclusivePattern.concat('_').concat('cookie:');



// If match is null or empty, put all elements which belongs to button, label,
function recursiveFilter(source, matches, exclusive) {
  let sourceArray = [];

  for (let key in source) {
    // filter out nav-bar element, avoid miss back operation
    if (source.type === 'NavigationBar') {
      continue;
    }

    if (source.hasOwnProperty(key)) {
      if (key === 'children') {
        for (let i = 0; i < source[key].length; i++) {
          insertXPath(source, source[key][i]);
          let result = recursiveFilter(source[key][i], matches, exclusive);
          sourceArray = sourceArray.concat(result);
        }
      } else if (source[key] !== null) {
        if (matches) {
          // Explicit mode
          for (let match in matches) {
            if ((source.value && source.value === match) ||
              (source.name && source.name === match)     ||
              (source.label && source.label === match)) {
              source.input = matches[match].actionValue;
              return [source];
            }
          }
        } else {
          // If the source value/name/label matches the exclusive pattern, avoid recording
          if ((exclusive) && ((source.value && exclusive.includes(source.value)) ||
            (source.name && exclusive.includes(source.name))   ||
            (source.label && exclusive.includes(source.label)))) {
            return [];
          }

          if (source.type) {
            switch (source.type) {
              case 'StaticText':
              case 'Button':
              case 'Cell':
              case 'PageIndicator':
                sourceArray.push(source);
                return sourceArray;
              case 'TextField':
              case 'SecureTextField':
                source.input = 'random+123';
                sourceArray.push(source);
                return sourceArray;
              default:
            }
          }
        }
      }
    }
  }
  return sourceArray;
}

function checkPathIndex(parent, child) {
  let currentTypeCount = child.type + '_count';

  if (!parent[currentTypeCount]) {
    for (let i = 0; i < parent.children.length; i++) {
      currentTypeCount = parent.children[i].type + '_count';
      if (!parent[currentTypeCount]) {
        parent[currentTypeCount] = 1;
      } else {
        parent[currentTypeCount]++;
      }
      parent.children[i].pathInParent = parent[currentTypeCount];
    }
  }
}

// Parent must be an array of child elements
function insertXPath(parent, child) {
  let prefix = crawlerConfig.platform === 'iOS' ? 'XCUIElementType' : '';
  checkPathIndex(parent, child);
  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath : '//' + prefix + 'Application[1]')+ '/' + prefix + child.type + '[' + currentIndex + ']';
}

function produceNodeActions(rawElements) {
  let actions = [];
  for (let index in rawElements) {
    let rawElement = rawElements[index];
    let action;

    switch (rawElement.type) {
      case 'StaticText':
      case 'Button':
      case 'Cell':
      case 'PageIndicator':
        action = new NSAppCrawlingTreeNodeAction();
        action.source = rawElement;
        action.location = rawElement.xpath;
        actions.push(action);
        break;
      case 'TextField':
      case 'SecureTextField':
        action = new NSAppCrawlingTreeNodeAction();
        action.source = rawElement;
        action.location = rawElement.xpath;
        action.input = rawElement.input;
        actions.push(action);
        break;
      default:
    }
  }
  return actions;
}

function refreshScreen() {
  window.wdclient.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
    let base64 = `data:image/jpg;base64,${data.value}`;
    $('#screen').attr('src', base64);
  });
}
*/
