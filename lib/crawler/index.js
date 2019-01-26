'use strict';

const EventEmitter = require('events');
let root = require('window-or-global');

const WDClient = require('../wd-client');
const NSCrawlerConfig = require('./config');
const logger = require('../common/logger');
const _ = require('../common/helper');
const path = require('path');

let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

// define Crawler
let NSCrawler;

if (crawlerConfig.strategy.toLowerCase() === 'ocr') {
  NSCrawler = require('./ocr-impl/ocr-crawler').NSCrawler;
} else {
  if (crawlerConfig.platform.toLowerCase() === 'ios') {
    NSCrawler = require('./wda-impl/ios').NSCrawler;
  } else if (crawlerConfig.platform.toLowerCase() === 'pc-web') {
    NSCrawler = require('./wda-impl/web').NSCrawler;
  } else {
    NSCrawler = require('./wda-impl/android').NSCrawler;
  }
}

// define Hooks
let Hooks;

if (root.cmdArgs && root.cmdArgs.hooks) {
  if (_.isExistedFile(root.cmdArgs.hooks)) {
    Hooks = require(path.resolve(process.cwd(), root.cmdArgs.hooks)).Hooks;
  } else {
    process.exit();
  }
} else {
  Hooks = require('../../demo/hooks').Hooks;
}

if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.wdclient = new WDClient({
  server: root.cmdArgs.server ? root.cmdArgs.server : 'http://localhost:3456',
  config: crawlerConfig
});

root.eventEmmiter.addListener('onSessionCreated', (data) => {
  console.log('initialize crawler');
  logger.filterDeviceLogs(root.config);
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  root.hooks = new Hooks();
  _.addHookAPIs(root.hooks, crawler);

  if (typeof root.hooks.beforeCrawlingStart === 'function') {
    root.hooks.beforeCrawlingStart().then(() => {
      setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
    });
  } else {
    setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
  }
});
