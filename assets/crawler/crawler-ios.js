'use strict';

let root = require('window-or-global');
let utils = require('../utils');

let NSCrawler = require('./crawler').NSCrawler;

// Perform Node Actions
NSCrawler.prototype.performAction = function(actions) {
  this.refreshScreen();

  root.wdclient
    .send(`/wd/hub/session/`+this.sessionId+`/source`, `get`, null, null)
    .then(() => {
      for (let i = 0; i < actions.length; i++) {
        let action = actions[i];
        if (!action.isTriggered) {
          action.isTriggered = true;
          console.log(JSON.stringify(action.source));

          root.wdclient
            .send(`/wd/hub/session/`+ this.sessionId+ `/element`, `post`, {
              using: 'xpath',
              value: action.location
            }, null)
            .then(data => {
              if (data.status === 0) {
                switch (action.source.type) {
                  case 'StaticText':
                  case 'Button':
                    root.wdclient.send(`/wd/hub/session/`+ this.sessionId + `/element/` + data.value.ELEMENT + `/click`, 'post', {}, null);
                    break;
                  case 'PageIndicator':
                    root.wdclient
                      .send(`/wd/hub/session/` + this.sessionId + `/dragfromtoforduration`,`post`, {
                        fromX: 10,
                        fromY: 200,
                        toX: 300,
                        toY: 200,
                        duration: 2.00
                      }, null);
                    break;
                  case 'TextField':
                  case 'SecureTextField':
                    root.wdclient
                      .send(`/wd/hub/session/` + this.sessionId + `/element/` + data.value.ELEMENT + `/value`,`post`, {
                        'value': [action.input]
                      }, null);
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

// Parent must be an array of child elements
NSCrawler.prototype.insertXPath = function (parent, child) {
  let prefix = this.config.platform === 'iOS' ? 'XCUIElementType' : '';

  /** scan and check index path for once and only once*/
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

  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath : '//' + prefix + 'Application[1]')+ '/' + prefix + child.type + '[' + currentIndex + ']';
};

exports.NSCrawler = NSCrawler;