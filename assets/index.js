'use strict';

let EventEmitter = require('wolfy87-eventemitter');
let WDClient = require('./wd-client');
let NSCrawlerConfig = require('./config');

const {
  NSCrawler
} = require('./crawler/crawler');

let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

window.eventEmmiter = new EventEmitter();
window.wdclient = new WDClient({
  server: 'http://localhost:3456'
});

window.eventEmmiter.addListener('onSessionCreated', (data)=>{
  console.log('check about we are here')
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
