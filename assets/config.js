'use strict';

let YAML = require('yamljs');
let utils = require('./utils');

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
  this.maxActionPerPage = 20;
  this.navigationBackKeyword =[];
  this.targetElements = {};
  this.exclusivePattern = '';
  this.platform = 'iOS';
  this.clickTypes = [];
  this.editTypes = [];
  this.horizontalScrollTypes = [];
  this.verticalScrollTypes = [];
  this.tabBarTypes = [];
  this.exclusiveTypes = [];
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
  console.log("check is web runtime" + utils.isWebRuntime());

  let crawlingConfig = null
  if (!utils.isWebRuntime()) {
    crawlingConfig =  YAML.load(__dirname+'/../public/crawler.config.yml').crawlingConfig;
  } else {
    crawlingConfig =  YAML.load('crawler.config.yml').crawlingConfig;
  }

  for (let i in crawlingConfig) {
    if (crawlingConfig.hasOwnProperty(i) && this.hasOwnProperty(i)) {
      this[i] = crawlingConfig[i];
    }
  }
};

module.exports = NSCrawlerConfig;
