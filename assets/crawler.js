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

exports.NSCrawler = NSCrawler;
