'use strict';

let $ = require('jQuery');
let utils = require('../utils');

const {
  NSAppCrawlingTreeNodeAction,
  NSAppCrawlingTreeNode
} = require('./models');

let NSCrawler = require('./crawler').NSCrawler;

// Perform Node Actions
NSCrawler.prototype.performAction = function() {
  let that = this;
  window.wdclient
    .send(`/wd/hub/session/${this.sessionId}/source`, `get`, null, null)
    .then(() => {
      for (let i = 0; i < that.currentNode.actions.length; i++) {
        let action = that.currentNode.actions[i];
        if (!action.isTriggered) {
          action.isTriggered = true;
          console.log(JSON.stringify(action.source));

          window.wdclient
            .send(`/wd/hub/session/${this.sessionId}/element`, `post`, {
              using: 'xpath',
              value: action.location
            }, null)
            .then(data => {
              if (data.status === 0) {
                switch (action.source.type) {
                  case 'StaticText':
                  case 'Button':
                  case 'Cell':
                    window.wdclient.send(`/wd/hub/session/${this.sessionId}/element/${data.value.ELEMENT}/click`, 'post', {}, null)
                      .then(() => {
                        this.refreshScreen();
                      });
                    break;
                  case 'PageIndicator':
                    window.wdclient
                      .send(`/wd/hub/session/${this.sessionId}/dragfromtoforduration`,`post`, {
                        fromX: 10,
                        fromY: 200,
                        toX: 300,
                        toY: 200,
                        duration: 2.00
                      }, null)
                      .then(() => {
                        this.refreshScreen();
                      });
                    break;
                  case 'TextField':
                  case 'SecureTextField':
                    window.wdclient
                      .send(`/wd/hub/session/${this.sessionId}/element/${data.value.ELEMENT}/value`,`post`, {
                        'value': [action.input]
                      }, null)
                      .then(() => {
                        this.refreshScreen();
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

// If match is null or empty, put all elements which belongs to button, label,
NSCrawler.prototype.recursiveFilter = function (source, matches, exclusive) {
  let sourceArray = [];

  // filter out nav-bar element, avoid miss back operation
  if (source.type === 'NavigationBar') {
    return [];
  }

  if (source.hasOwnProperty('children')) {
    for (let i = 0; i < source.children.length; i++) {
      this.insertXPath(source, source.children[i]);
      let result = this.recursiveFilter(source.children[i], matches, exclusive);
      sourceArray = sourceArray.concat(result);
    }
  }

  if (matches) {
    // Explicit mode
    for (let match in matches) {
      if ((source.value && source.value === matches[match].searchValue) ||
        (source.name && source.name === matches[match].searchValue)     ||
        (source.label && source.label === matches[match].searchValue)) {
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
      if (this.config.clickTypes.indexOf(source.type) >= 0) {
        sourceArray.push(source);
      } else if (this.config.editTypes.indexOf(source.type) >= 0) {
        source.input = 'random+123';
        sourceArray.push(source);
      }
    }
  }

  return sourceArray;
}

NSCrawler.prototype.checkPathIndex = function (parent, child) {
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
NSCrawler.prototype.insertXPath = function (parent, child) {
  let prefix = this.config.platform === 'iOS' ? 'XCUIElementType' : '';
  this.checkPathIndex(parent, child);
  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath : '//' + prefix + 'Application[1]')+ '/' + prefix + child.type + '[' + currentIndex + ']';
}

exports.NSCrawler = NSCrawler;
