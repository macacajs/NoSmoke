'use strict';

let EventEmitter = require('wolfy87-eventemitter');
let WDClient = require('./wd-client');
let NSCrawlerConfig = require('./config');
let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

const {
  NSCrawler
} = require(crawlerConfig.platform == 'iOS'?'./crawler/crawler-ios':'./crawler/crawler-android');

window.eventEmmiter = new EventEmitter();
window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

window.eventEmmiter.addListener('onSessionCreated', (data)=>{
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
