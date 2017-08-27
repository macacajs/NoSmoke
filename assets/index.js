'use strict';

let EventEmitter = require('wolfy87-eventemitter');
let WDClient = require('./wd-client');
let root = require('window-or-global');
let NSCrawlerConfig = require('./config');
let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

let NSCrawler;
if (crawlerConfig.platform == 'iOS') {
  NSCrawler = require('./crawler/crawler-ios').NSCrawler;
} else {
  NSCrawler = require('./crawler/crawler-android').NSCrawler;
}

if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

root.eventEmmiter.addListener('onSessionCreated', (data)=>{
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
