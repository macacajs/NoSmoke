'use strict';

const WDClient = require('./wd-client');
const NSCrawlerConfig = require('./config');
const {
  NSCrawler
} = require('./crawler/crawler');

let crawlerConfig = new NSCrawlerConfig();
crawlerConfig.loadDefault();

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
}).then((data) => {
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
