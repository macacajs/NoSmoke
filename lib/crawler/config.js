'use strict';

const path = require('path');
const YAML = require('yamljs');
const fs = require('fs');

/** Crawling Action Target  */
function NSCrawlerConfig() {
  this.testingPeriod = 0.5 * 60 * 60;
  this.testingDepth = 8;
  this.takeScreenShot = true;
  this.newCommandTimeout = 6;
  this.launchTimeout = 6;
  this.maxActionPerPage = 15;
  this.asserts = [];
  this.targetElements = {};
  this.exclusivePattern = '';
  this.platform = 'ios';
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
    'launchTimeout: ' + this.launchTimeout + '\n' +
    'targetElements: ' + this.targetElements + '\n';
};

NSCrawlerConfig.prototype.loadDefault = function() {
  let configFile = path.join(__dirname, '..', '..', 'public', 'crawler.config.yml');
  if (root.cmdArgs.config) {
    if (fs.existsSync(root.cmdArgs.config)) {
      configFile = root.cmdArgs.config;
    } else {
      console.log('invalid config file paths :' + root.cmdArgs.config);
      process.exit();
    }
  }

  let crawlingConfig = YAML.load(configFile).crawlingConfig;

  for (let i in crawlingConfig) {
    if (crawlingConfig.hasOwnProperty(i) && this.hasOwnProperty(i)) {
      this[i] = crawlingConfig[i];
    }
  }

  this.platform = this.platform.toLowerCase();
};

module.exports = NSCrawlerConfig;
