'use strict';

const EventEmitter = require('events');
let root = require('window-or-global');

const WDClient = require('../wd-client');
const NSCrawlerConfig = require('./config');

let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

let NSCrawler;
if (crawlerConfig.platform.toLowerCase() === 'ios') {
  NSCrawler = require('./ios').NSCrawler;
} else if (crawlerConfig.platform.toLowerCase() === 'pc-web') {
  NSCrawler = require('./web').NSCrawler;
} else {
  NSCrawler = require('./android').NSCrawler;
}

if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.wdclient = new WDClient({
  server: 'http://localhost:3456',
  config: crawlerConfig
});

root.eventEmmiter.addListener('onSessionCreated', (data)=>{
  console.log('initialize crawler');
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
