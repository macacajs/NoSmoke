'use strict';

let utils = require('../utils');
let NSCrawler = require('./crawler').NSCrawler;
let root = require('window-or-global');

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

// NSCrawler.prototype.updateContext = function(source, contexts) {
//   let promise = new Promise((resolve) => {
//     if (contexts.length > 1) {
//       root.wdclient
//         .send(`/wd/hub/session/` + this.sessionId + `/context`, `post`, {'name':contexts[contexts.length - 1]}, null)
//         .then(() => {
//           resolve();
//         });
//     } else if (contexts.length === 1) {
//       root.wdclient
//         .send(`/wd/hub/session/` + this.sessionId + `/context`, `post`, {'name':contexts[0]}, null)
//         .then(() => {
//           resolve();
//         });
//     } else {
//       setTimeout(() => {resolve();}, 500);
//     }
//   });
//
//   return promise;
// };

exports.NSCrawler = NSCrawler;
