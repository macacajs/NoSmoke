'use strict';

const fs = require('fs');
const path = require('path');
const root = require('window-or-global');
const Tesseract = require('tesseract.js');

const _ = require('../../common/helper');

let Hooks;

if (root.cmdArgs && root.cmdArgs.hooks) {
  if (_.isExistedFile(root.cmdArgs.hooks)) {
    Hooks = require(root.cmdArgs.hooks).Hooks;
  } else {
    process.exit();
  }
} else {
  Hooks = require('../../../public/hooks').Hooks;
}

const hooks = new Hooks();

const maxRepeatCrawlingCount = 8;

const {
  NSAppCrawlingTreeNode
} = require('../models');

function NSCrawler(config, sessionId) {
  this.config = config;
  this.sessionId = sessionId;
  this.crawlingBuffer = [];
  this.currentNode = null;
  this.currentAction = null;
  this.repeatingCrawlingCount = 0;
  this.crawlingExpires = false;
}

NSCrawler.prototype.initialize = function() {
  setTimeout(() => {
    this.crawlingExpires = true;
  }, this.config.testingPeriod * 1000);

  process.on('uncaughtException', (err) => {
    console.log('Caught exception: ' + err);
    this.terminate(err);
  });

  process.on('unhandledRejection', (err, p) => {
    console.log('Rejection: ' + err + ' at promise ' + p);
    this.terminate(err);
  });

  return this;
};

NSCrawler.prototype.crawl = function () {
  // Terminate under the following cases:
  // 1. the previous node has been finished for continuously count of 8, assume crawling finish
  // 2. the crawling process takes too long and hence expire
  if (this.repeatingCrawlingCount >= maxRepeatCrawlingCount || this.crawlingExpires) {
    this.terminate('terminate due to timeout');
    return;
  }

  // TODO:
  // this.performAction(this.currentNode.actions).then(() => {
  //   this.crawl();
  // });
};

NSCrawler.prototype.terminate = function(description) {
  console.log(`-----> Crawling Finished: <----- \n ${description}`);
  root.eventEmmiter.emit('terminateCrawling');
};

NSCrawler.prototype.explore = function(source) {
  let node = new NSAppCrawlingTreeNode();
};

NSCrawler.prototype.back = function () {
  root.wdclient.send('/wd/hub/session/' + this.sessionId + '/back', 'post', {}, null).then(() => {
    setTimeout(() => {
      this.refreshScreen();
      this.crawl();
    }, this.config.newCommandTimeout * 1000);
  });
};

// If match is null or empty, put all elements which belongs to button, label,
NSCrawler.prototype.recursiveFilter = function (source, matches, exclusive) {

  /** 0. check crawling validity, erase difference between muli-platforms */
  let sourceArray = [];

  // Provide OCR Source Here
  return sourceArray;
};

NSCrawler.prototype.performAction = function(actions) {
  let action = null;
  for (let i = 0; i < actions.length; i++) {
    let candidate = actions[i];
    if (!candidate.isTriggered) {
      candidate.isTriggered = true;

      /** log and only log in the current progress */
      this.currentAction = candidate;
      this.currentAction.checkInterval();
      this.refreshScreen();
      root.updatePassedTestsCount();
      console.log(JSON.stringify(candidate.source));

      action = candidate;
      break;
    }
  }

  if (!action) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  return new Promise((resolve, reject) => {
    resolve();
  });
};

NSCrawler.prototype.refreshScreen = function (currentAction) {
  /** Based on environment, choose the way of refresh screen */
  let that = this;
  return root.wdclient.send('/wd/hub/session/' + this.sessionId + '/screenshot', 'get', null, function(data) {

    if (!data.value || data.value.length === 0) {
      that.currentNode.fileName = '';
      return;
    }

    const screenshootsDir = path.join(process.cwd(), 'reports', root.crawlingDateStamp);
    const fileName = `${_.uuid()}.png`;
    const fileDir = path.join('.', root.crawlingDateStamp, fileName);

    _.mkdir(screenshootsDir);
    fs.writeFile(path.join(screenshootsDir, fileName), data.value, 'base64');

  }).catch(() => {
    that.currentNode.fileName = '';
    console.log('screenshot failure');
  });
};

exports.NSCrawler = NSCrawler;
