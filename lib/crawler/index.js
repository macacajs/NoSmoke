'use strict';

let EventEmitter = require('events');
let WDClient = require('../wd-client');
let root = require('window-or-global');
let NSCrawlerConfig = require('./config');
let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

let NSCrawler;
if (crawlerConfig.platform === 'iOS') {
  NSCrawler = require('./ios').NSCrawler;
} if (crawlerConfig.platform === 'PC-Web') {
  NSCrawler = require('./web').NSCrawler;
} else {
  NSCrawler = require('./android').NSCrawler;
}

if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

root.eventEmmiter.addListener('onSessionCreated', (data)=>{
  console.log('initialize crawler');
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
