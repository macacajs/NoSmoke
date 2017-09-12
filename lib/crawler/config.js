'use strict';

const path = require('path');
const YAML = require('yamljs');

/** Crawling Action Target  */
function NSCrawlerConfig() {
  this.testingPeriod = 0.5 * 60 * 60;
  this.testingDepth = 8;
  this.takeScreenShot = true;
  this.autoCancelAlert = true;
  this.newCommandTimeout = 3;
  this.launchTimeout = 6;
  this.maxActionPerPage = 15;
  this.navigationBackKeyword = [];
  this.targetElements = {};
  this.exclusivePattern = '';
  this.platform = 'iOS';
  this.clickTypes = [];
  this.editTypes = [];
  this.horizontalScrollTypes = [];
  this.verticalScrollTypes = [];
  this.tabBarTypes = [];
  this.exclusiveTypes = [];
  this.blacklist = [];
}

NSCrawlerConfig.prototype.debugDesriptoin = function() {
  return 'newCommandTimeout: ' + this.newCommandTimeout + '\n' +
    'testingDepth: ' + this.testingDepth + '\n' +
    'takeScreenShot: ' + this.takeScreenShot + '\n' +
    'autoCancelAlert: ' + this.autoCancelAlert + '\n' +
    'launchTimeout: ' + this.launchTimeout + '\n' +
    'targetElements: ' + this.targetElements + '\n';
};

NSCrawlerConfig.prototype.loadDefault = function() {
  const configFile = path.join(__dirname, '..', '..', 'public', 'crawler.config.yml');
  let crawlingConfig = YAML.load(configFile).crawlingConfig;

  for (let i in crawlingConfig) {
    if (crawlingConfig.hasOwnProperty(i) && this.hasOwnProperty(i)) {
      this[i] = crawlingConfig[i];
    }
  }
};

module.exports = NSCrawlerConfig;
