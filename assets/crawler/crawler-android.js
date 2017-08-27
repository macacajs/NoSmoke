'use strict';

let root = require('window-or-global');

let utils = require('../utils');

const {
  NSAppCrawlingTreeNodeAction,
  NSAppCrawlingTreeNode
} = require('./models');

let NSCrawler = require('./crawler').NSCrawler;

// Perform Node Actions
NSCrawler.prototype.performAction = function(actions) {
  this.refreshScreen();

  root.wdclient
    .send(`/wd/hub/session/${this.sessionId}/source`, `get`, null, null)
    .then(() => {
      for (let i = 0; i < actions.length; i++) {
        let action = actions[i];
        if (!action.isTriggered) {
          action.isTriggered = true;
          console.log(JSON.stringify(action.source));

          root.wdclient
            .send(`/wd/hub/session/${this.sessionId}/element`, `post`, {
              using: 'xpath',
              value: action.location
            }, null)
            .then(data => {
              if (data.status === 0) {
                switch (action.source.type) {
                  case 'android.widget.HorizontalScrollView':
                  case 'android.widget.ViewFlipper':
                    root.wdclient
                      .send(`/wd/hub/session/` +this.sessionId + `/dragfromtoforduration`,`post`, {
                        fromX: 10,
                        fromY: 200,
                        toX: 300,
                        toY: 200,
                        duration: 2.00
                      }, null)
                      .then(() => {});
                    break;
                  case 'android.widget.EditText':
                    root.wdclient
                      .send(`/wd/hub/session/` +this.sessionId + `/element/` + data.value.ELEMENT +`/value`,`post`, {
                        'value': [action.input]
                      }, null)
                      .then(() => {});
                    break;
                  default:
                    let NUMERIC_REGEXP = /[-]{0,1}[\d.]*[\d]+/g;
                    let raw = action.source.bounds.match(NUMERIC_REGEXP);
                    root.wdclient
                      .send(`/wd/hub/session/` + this.sessionId + `/actions`, `post`, {
                        actions: [{
                          type: 'tap',
                          x: (parseFloat(raw[0]) + parseFloat(raw[2]))/2,
                          y: (parseFloat(raw[1]) + parseFloat(raw[3]))/2
                        }]
                      }, null)
                      .then(() => {});
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

  // Dive deeper in Nodes
  if (source.hasOwnProperty('node')) {
    if (utils.isArray(source.node)) {
      for (let i = 0; i < source.node.length; i++) {
        this.insertXPath(source, source.node[i]);
        let result = this.recursiveFilter(source.children[i], matches, exclusive);
        if (this.config.tabBarTypes.indexOf(source.type) >= 0) {
          // Check if sourceType is tab, put it in a high priority list
          this.insertTabNode(result);
          return [];
        } else {
          // Check for local source array for normal cases
          sourceArray = sourceArray.concat(result);
        }
      }
    } else {
      this.insertXPath(source, source.node);
      let result = this.recursiveFilter(source.node, matches, exclusive);
      sourceArray = sourceArray.concat(result);
    }
  }

  // Check matches
  if (matches) {
    // Explicit mode
    for (let match in matches) {
      if (source.text && source.text === matches[match].searchValue) {
        source.input = matches[match].actionValue;
        return [source];
      }
    }
  } else {
    // If the source value/name/label matches the exclusive pattern, avoid recording
    if ((exclusive) && (source.text && exclusive.includes(source.text))) {
      return [];
    }

    if (!source.class || source.class.indexOf('Layout') >= 0 || source.class.indexOf('.View') >= 0) {
      return sourceArray;
    }

    if (source.class) {
      if (this.config.clickTypes.indexOf(source.class) >= 0) {
        sourceArray.push(source);
      } else if (this.config.editTypes.indexOf(source.class) >= 0) {
        source.input = 'random+123';
        sourceArray.push(source);
      }
    }
  }

  return sourceArray;
};

NSCrawler.prototype.checkPathIndex = function (parent, child) {
  let currentTypeCount = child.class + '_count';

  if (!parent[currentTypeCount]) {
    if (utils.isArray(parent.node)) {
      for (let i = 0; i < parent.node.length; i++) {
        currentTypeCount = parent.node[i].class + '_count';
        if (!parent[currentTypeCount]) {
          parent[currentTypeCount] = 1;
        } else {
          parent[currentTypeCount]++;
        }
        parent.node[i].pathInParent = parent[currentTypeCount];
      }
    } else {
        parent.node.pathInParent = 1;
    }
  }
};

// Parent must be an array of child elements
NSCrawler.prototype.insertXPath = function (parent, child) {
  let prefix = '';
  this.checkPathIndex(parent, child);
  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath + '/' : '//') + prefix + child.class + '[' + currentIndex + ']';
};

exports.NSCrawler = NSCrawler;
