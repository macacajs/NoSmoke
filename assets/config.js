'use strict';

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

module.exports = NSCrawlerConfig;
