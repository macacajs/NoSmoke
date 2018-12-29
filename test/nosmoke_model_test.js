/* global describe it */

'use strict';

const assert = require('assert');
const CrawlingNode = require('../lib/crawler/wda-impl/models').NSAppCrawlingTreeNode;
const Template = require('../lib/crawler/reporterTemplate');
let root = require('window-or-global');

describe('#WD Node Tests', function() {

  // invoke initialization
  Template.initialize();
  assert.ok(root.mockData != null);

  let mockActions = [
    {
      source: 'mock source 1',
      xpath: '//*[@resource-id="mock.package.id/submit"]',
      input: ''
    },
    {
      source: 'mock source 2',
      xpath: '//*[@resource-id="mock.package.id/click"]',
      input: ''
    }];

  let crawlingNode = new CrawlingNode();
  let crawler = {};

  it('initialization should success', function() {
    let actions = crawlingNode.produceNodeActions(mockActions);
    assert.ok(actions.length === 2);
    crawlingNode.actions = actions;
    crawler.currentAction = crawlingNode.actions[0];
    crawler.crawlingBuffer = [crawlingNode];

    assert.ok(crawlingNode.actions[0].title() !== null);
  });

  it('check interval', function() {
    assert.ok(crawlingNode.actions[0] !== null);

    crawlingNode.actions[0].checkInterval();
    assert.ok(crawlingNode.actions[0].interval === 0);

    setTimeout(() => {
      crawlingNode.actions[0].checkInterval();
      assert.ok(crawlingNode.actions[0].interval > 0);
    }, 2000);
  });

  it('finished browsing', function() {
    assert.ok(crawlingNode.isFinishedBrowsing() === false);

    for (let action of crawlingNode.actions) {
      action.isTriggered = true;
    }

    assert.ok(crawlingNode.isFinishedBrowsing() === true);
  });

  it('check digest', function() {
    crawlingNode.digest = 'mock_test_case_digest';
    assert.ok(crawlingNode.abbreviatedDigest() === 'mock-test-case-digest');

    crawlingNode.digest = 'mock_test_case_digest_test';
    assert.ok(crawlingNode.abbreviatedDigest() === 'test-case-digest-test');
  });

  it('check update report data', function() {
    crawlingNode.updateReportData(crawler);
  });

});
