'use strict';

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
  this.searchMethod = NSTargetSearchType.Value;   // Searchable via XPath, Value, Identifier
  this.searchValue = null;                        // Search value, value of XPath, Value & Identifier
  this.actionType  = NSTargetActionType.CLICK;
  this.actionPerformTimes = 1;
  this.actionValue = null;
}

function NSCrawlerConfig() {
  this.testingPeriod = 0.5 * 60 * 60;
  this.testingDepth = 16;
  this.takeScreenShot = true;
  this.autoCancelAlert = true;
  this.newCommandTimeout = 3;
  this.launchTimeout = 6;
  this.maxActionPerPage = 100;
  this.navigationBackKeyword =[];
  this.targetElements = {};
  this.exclusivePattern = '';
  this.platform = 'iOS';
}

NSCrawlerConfig.prototype.debugDesriptoin =  function() {
  return 'newCommandTimeout: ' + this.newCommandTimeout + '\n' +
    'testingDepth: ' + this.testingDepth + '\n' +
    'takeScreenShot: ' + this.takeScreenShot+ '\n' +
    'autoCancelAlert: ' + this.autoCancelAlert+ '\n' +
    'launchTimeout: ' + this.launchTimeout+ '\n' +
    'targetElements: ' + this.targetElements+ '\n';
};

NSCrawlerConfig.prototype.loadDefault = function() {
  let loginAccount = new NSTargetElement();
  let loginPassword = new NSTargetElement();
  let loginButton = new NSTargetElement();

  loginAccount.actionType = NSTargetActionType.INPUT;
  loginAccount.searchValue = 'please input username';
  loginAccount.actionValue = '中文+Test+12345678';

  loginPassword.actionType = NSTargetActionType.INPUT;
  loginPassword.searchValue = 'please input password';
  loginPassword.actionValue = '111111';

  loginButton.actionType = NSTargetActionType.CLICK;
  loginButton.searchValue = 'Login';

  this.targetElements[loginAccount.searchValue] = loginAccount;
  this.targetElements[loginPassword.searchValue] = loginPassword;
  this.targetElements[loginButton.searchValue] = loginButton;

  this.navigationBackKeyword.push('返回');
  this.navigationBackKeyword.push('取消');
  this.exclusivePattern = this.exclusivePattern.concat('_').concat('pushView');
  this.exclusivePattern = this.exclusivePattern.concat('_').concat('popView');
  this.exclusivePattern = this.exclusivePattern.concat('_').concat('cookie:');
};

module.exports = NSCrawlerConfig;
