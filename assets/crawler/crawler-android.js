'use strict';

let root = require('window-or-global');
let utils = require('../utils');

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
                    root.wdclient.send(`/wd/hub/session/`+ this.sessionId + `/element/` + data.value.ELEMENT + `/click`, 'post', {}, null);
                    break;
                }
              }
            });
          return;
        }
      }
    });
};

NSCrawler.prototype.checkElementValidity = function (source) {
  if (!source.class || source.class.indexOf('Layout') >= 0 || source.class.indexOf('.View') >= 0) {
    return false;
  }
  return true;
};

NSCrawler.prototype.insertXPath = function (parent, child) {
  let prefix = '';

  /** scan and check index path for once and only once*/
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

  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath + '/' : '//') + prefix + child.class + '[' + currentIndex + ']';
};

exports.NSCrawler = NSCrawler;
