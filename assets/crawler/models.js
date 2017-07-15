'use strict';

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.path = '';       // Unique path which leads to current page
  this.parent = null;   // Parent ui element
  this.actions = [];    // Units in {value : NSAppCrawlingTreeNodeAction}
  this.digest = null;
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