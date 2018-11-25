/* global describe it */

'use strict';

const assert = require('assert');

const regexMock = require('./mock').mockRegexRaw;
const NSCrawlerConfig = require('../lib/crawler/config');
const NSCrawler = require('../lib/crawler/wda-impl/crawler').NSCrawler;

describe('#Load Configuration', function() {
  let config = new NSCrawlerConfig();
  config.loadDefault();

  it('clickTypes should have value', function() {
    assert.ok(config.clickTypes.length, 'clickTypes should have value');
  });

  it('editTypes should have value', function() {
    assert.ok(config.editTypes.length, 'editTypes should have value');
  });

  it('testing depth should be greater than 5', function() {
    assert.ok(config.testingDepth > 5, 'testing depth should be greater than 5');
  });

  it('testing max action perpage', function () {
    assert.ok(config.maxActionPerPage > 0, 'max action  perpage should be greater than 0');
  });
});

describe('#Check Regex', function() {
  let config = new NSCrawlerConfig();
  config.loadDefault();
  let crawler = new NSCrawler(config, 'mock session');
  it('Regex Check', function() {
    assert.ok(crawler.checkContentMatch(regexMock, 'android\\s+bootstrap', true), 'when appears');
    assert.ok(crawler.checkContentMatch(regexMock, 'please\\s+input\\s+username', true), 'then appears');
  });
});
