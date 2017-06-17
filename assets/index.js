'use strict';

function WDClient(options) {
  this.server = options.server;
  this.init();
};

var sessionId = "";

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
    sessionId = data.sessionId;
    console.log(data.value);
    that.send(`/wd/hub/session/${sessionId}/screenshot`, 'get', null, function(data) {
      var base64 = `data:image/jpg;base64,${data.value}`;
      $('#screen').attr('src', base64);
    });

    // Start crawling
    new NSCrawler(crawlerConfig, sessionId).initialize().crawl();
  });
};

WDClient.prototype.send = function(url, method, body, callback) {
  function parseJSON(response) {
    return response.json()
  }
  if (method.toLowerCase() === 'post') {
    return fetch(`${this.server}${url}`, {
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
    return fetch(`${this.server}${url}`, {
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

var NSTargetSearchType = {
  XPath: 1,
  Value: 2,
  Identifier: 3
};

function NSTargetElement() {
  this.searchMethod = NSTargetSearchType.XPath;   // Searchable via XPath, Value, Identifier
  this.searchValue = null;                        // Search value, value of XPath, Value & Identifier
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
  this.navigationBackKeyword =[];
  this.targetElements = {};
  this.exclusiveList = [];
}

NSCrawlerConfig.prototype.debugDesriptoin =  function () {
  return "newCommandTimeout: " + this.newCommandTimeout + "\n" +
    "testingDepth: " + this.testingDepth + "\n" +
    "takeScreenShot: " + this.takeScreenShot+ "\n" +
    "autoCancelAlert: " + this.autoCancelAlert+ "\n" +
    "launchTimeout: " + this.launchTimeout+ "\n" +
    "targetElements: " + this.targetElements+ "\n";
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

/** Crawling Buffer **/
function NSAppCrawlingBuffer() {
  this.buffer = [];       // Node tree, which contains a set of NSAppCrawlingTreeNode
}

/** ----------------------------------------  AppCrawler Implementation: 2. Crawler Logic ----------------------------------------- **/

function NSCrawler(config, sessionId) {
  this.config         = config;                     // Config in format of NSCrawlerConfig
  this.sessionId      = sessionId;                  // Session Id
  this.crawlingBuffer = new NSAppCrawlingBuffer();  // The set of notes
  this.currentNode    = null;                       // Current node which is in crawling
}

NSCrawler.prototype.initialize = function () {
  return this;
}

NSCrawler.prototype.crawl = function () {
  console.log("----> SessionId: <----");
  console.log(this.sessionId);
  console.log("----> Config Info: <----");
  console.log(this.config.debugDesriptoin());
  console.log("----> Crawling <----");
}

/** ----------------------------------------  AppCrawler Implementation: 3. Configuration & Run ----------------------------------------- **/

// Login configuration
var loginAccount  = new NSTargetElement();
var loginPassword = new NSTargetElement();
var loginButton   = new NSTargetElement();

loginAccount.actionType     = NSTargetActionType.INPUT;
loginAccount.searchValue    = "";
loginAccount.actionValue    = "中文+Test+12345678";

loginPassword.actionType    = NSTargetActionType.INPUT;
loginPassword.searchValue   = "";
loginPassword.actionValue   = "111111";

loginButton.actionType      = NSTargetActionType.CLICK;
loginButton.searchValue     = "";

var crawlerConfig = new NSCrawlerConfig();
crawlerConfig.targetElements[loginAccount.searchValue] = loginAccount;
crawlerConfig.targetElements[loginPassword.searchValue] = loginPassword;
crawlerConfig.targetElements[loginButton.searchValue] = loginButton;

crawlerConfig.navigationBackKeyword.push("返回")
crawlerConfig.navigationBackKeyword.push("取消")


