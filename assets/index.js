'use strict';

const _ = require('./utils');
const WDClient = require('./wd-client');
const NSCrawlerConfig = require('./config');
const {
  NSCrawler
} = require('./crawler');

let crawlerConfig = new NSCrawlerConfig();

window.wdclient = new WDClient({
  server: 'http://localhost:3456'
}).then((data) => {
  let crawler = new NSCrawler(crawlerConfig, data.sessionId).initialize();
  setTimeout(crawler.crawl.bind(crawler), crawlerConfig.launchTimeout * 1000);
});
