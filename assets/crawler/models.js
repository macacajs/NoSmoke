'use strict';

let utils = require('../utils');

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = '';       // Unique path which leads to current page
  this.parent = null;   // Parent ui element
  this.type  = 'normal';  //  'tab'/ 'normal'
  this.depth = 0;
  this.actions = [];    // Units in {value : NSAppCrawlingTreeNodeAction}
  this.digest = null;
}

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.location = null;
  this.input = null;
  this.source = {};
}

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

NSAppCrawlingTreeNode.prototype.checkDigest = function(platform, source) {
  if (this.digest == null) {
    if (platform == 'iOS') {
      return window.wdclient.send(`/wd/hub/session/${window.wdclient.sessionId}/title`,`get`, null, null)
        .then(title  => {
          this.digest = title.value;
        });
    } else {
      return new Promise((resolve) => {
        this.digest = (source.value.match(/node/g) || []).length + '_' +
          (source.value.match(/TextView/g) || []).length + '_' +
          (source.value.match(/EditText/g) || []).length + '_' +
          (source.value.match(/Layout/g) || []).length + '_' +
          (source.value.match(/Button/g) || []).length;
        resolve(this.digest);
      });
    }
  } else {
    return new Promise((resolve) => {
      resolve(this.digest);
    });
  }
};

exports.NSAppCrawlingTreeNodeAction  = NSAppCrawlingTreeNodeAction;
exports.NSAppCrawlingTreeNode = NSAppCrawlingTreeNode;