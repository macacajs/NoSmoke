'use strict';

const _ = require('./utils');
const WDClient = require('./wd-client');
const NSCrawlerConfig = require('./config');

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

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

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.location = null;
  this.input = null;
  this.source = {};
}

NSAppCrawlingTreeNodeAction.prototype.desription = function() {

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
