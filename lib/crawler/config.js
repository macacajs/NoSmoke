'use strict';

const path = require('path');
const YAML = require('yamljs');
const EOL = require('os').EOL;

const _ = require('../common/helper');

/** Crawling Action Target  */
function NSCrawlerConfig() {
  this.testingPeriod = 0.5 * 60 * 60;
  this.testingDepth = 8;
  this.takeScreenShot = true;
  this.newCommandTimeout = 2;
  this.launchTimeout = 3;
  this.packages = '.*';
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

  // - phase 2 - OCR
  this.strategy = 'source';
  this.depth = 100;
  this.duration = 1800;
  this.triggers = [];
  this.exclude = [];
  this.deviceType = '';
}

NSCrawlerConfig.prototype.loadDefault = function() {
  let configFile = path.join(__dirname, '..', '..', 'demo', 'crawler.config.yml');
  if (root.cmdArgs && root.cmdArgs.config) {
    if (_.isExistedFile(root.cmdArgs.config)) {
      configFile = root.cmdArgs.config;
    } else {
      console.log('invalid config file paths :' + root.cmdArgs.config);
      process.exit();
    }
  }

  let crawlingConfig = YAML.load(configFile).crawlingConfig;

  // check and load config from config files.
  for (let i in crawlingConfig) {
    if (crawlingConfig.hasOwnProperty(i) && this.hasOwnProperty(i)) {
      this[i] = crawlingConfig[i];
    }
  }

  this.configFile = configFile;
  this.platform = this.platform.toLowerCase();

  // check if commandline args can override config params.
  for (let i in root.cmdArgs) {
    if (this.hasOwnProperty(i) && root.cmdArgs[i]) {
      this[i] = root.cmdArgs[i];
    }
  }

  console.log(`config loaded: ${EOL} ${JSON.stringify(this)} ${EOL}`);
};

module.exports = NSCrawlerConfig;
