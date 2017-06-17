'use strict';

function WDClient(options) {
  this.server = options.server;
  this.init();
};

WDClient.prototype.init = function() {
  var that = this;
  console.log(this.server);
  this.send('/wd/hub/session', 'post', {
    desiredCapabilities: {
      platformName: 'ios',
      deviceName: 'iPhone 6 Plus',
      // app: '~/.macaca-temp/ios-app-bootstrap.app'
      app: '/Users/Gangdooz/private/macaca/NoSmoke/.macaca-temp/ios-app-bootstrap.app'
    }
  }, function(data) {
    var sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      var base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });
  });
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json()
  }
  if (method.toLowerCase() === 'post') {
    fetch(`${this.server}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(parseJSON)
      .then(function(data) {
        callback(data);
      });
  } else {
    fetch(`${this.server}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(parseJSON)
      .then(function(data) {
        callback(data);
      });
  }
};

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});


/** ----------------------------------------  AppCrawler Implementation: 1. Modeling  ----------------------------------------- **/

/** Crawling Action Target  */
var NSTargetActionType = {
  CLICK: 1,
  INPUT: 2,
  SWIPE: 3,
  NAVIGATE: 4
};

function NSTargetElement() {
  this.recognizableTag = null;
  this.actionType  = NSTargetActionType.CLICK;
  this.actionPerformTimes = 1;
  this.actionValue = null;
}

/** Crawling Config  */
function NSCrawlerConfig() {
  this.testingPeriod = 2 * 60 * 60;
  this.testingDepth = 16;
  this.takeScreenShot = true;
  this.autoCancelAlert = true;
  this.newCommandTimeout = 1;
  this.launchTimeout = 6;
  this.maxActionPerPage = 20;
  this.navigationBackKeyword =["返回","取消"];
  this.targetElements = {};
  this.exclusiveList = [];
}

NSCrawlerConfig.prototype.debugDesriptoin =  function () {
  return "newCommandTimeout: " + this.newCommandTimeout + "\n" +
    "testingDepth: " + this.testingDepth + "\n" +
    "takeScreenShot: " + this.takeScreenShot+ "\n" +
    "autoCancelAlert: " + this.autoCancelAlert+ "\n" +
    "launchTimeout: " + this.launchTimeout+ "\n";
}

/** Crawling Node: each of the tree node represents a unique user page  */
function NSAppCrawlingTreeNode() {
  this.pageId = "";     // Unique page id for each of the page
  this.path = "";       // Unique path which leads to current page
  this.parent = null;   // Parent ui element
  this.actions = {};    // Units in {value : NSAppCrawlingTreeNodeAction}
  this.childen = [];    // Units in [NSAppCrawlingTreeNode]
}

NSAppCrawlingTreeNode.prototype.isFinishedBrowseing = function () {

}
  
NSAppCrawlingTreeNode.prototype.digest = function () {

}

function NSAppCrawlingTreeNodeAction() {
  this.isTriggered = false;
  this.action = null;
  this.input = null;
}

NSAppCrawlingTreeNodeAction.prototype.desription = function() {

}

/** Crawling Tree **/
function NSAppCrawlingTree() {
  this.tree = [];       // Node tree, which contains a set of NSAppCrawlingTreeNode
}

/** ----------------------------------------  AppCrawler Implementation: 2. Logic  ----------------------------------------- **/


