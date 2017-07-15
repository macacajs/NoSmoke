'use strict';

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

exports.NSCrawler = NSCrawler;

