/* global describe it */

'use strict';

const assert = require('assert');
const Template = require('../lib/crawler/reporterTemplate');
const CrawlingNode = require('../lib/crawler/ocr-impl/models').NSAppCrawlingTreeNode;

let root = require('window-or-global');

describe('#WD Node Tests', function() {

  // invoke initialization
  Template.initialize();
  assert.ok(root.mockData != null);

  let mockActions = [
    {
      source: 'mock source 1',
      location: {origin: {x: 1.0, y: 1.0}, size: {w: 1.0, h: 1.0}},
      input: '',
      name: 'mock1'
    },
    {
      source: 'mock source 2',
      location: {origin: {x: 1.0, y: 1.0}, size: {w: 1.0, h: 1.0}},
      input: '',
      name: 'mock2'
    }];

  let crawlingNode = new CrawlingNode();
  let crawler = {};

  it('initialization should success', function() {
    let actions = crawlingNode.produceNodeActions(mockActions);
    crawlingNode.actions = actions;
    crawler.currentNode = crawlingNode;
    crawler.currentAction = crawlingNode.actions[0];
    crawler.crawlingBuffer = [crawlingNode];

    assert.ok(actions.length === 2);
  });

  it('check if is finished', function() {
    assert.ok(crawlingNode.isFinishedBrowsing() === false);

    for (let action of crawlingNode.actions) {
      action.isTriggered = true;
    }

    assert.ok(crawlingNode.isFinishedBrowsing() === true);

    crawlingNode.repeatable = true;

    assert.ok(crawlingNode.isFinishedBrowsing() === false);
  });

  it('check digest', function() {
    let digest = crawlingNode.abbreviatedDigest();
    console.log(digest);
    assert.ok(digest === 'mock1_mock2');

    let checkDigest = crawlingNode.checkDigest('', {text: 'source_mock'});
    assert.ok(checkDigest === 'source_mock');

    let title = crawlingNode.actions[0].title();
    assert.ok(title !== null);
  });

  it('check report management', function() {
    crawlingNode.checkAndInitReportDataIfNeeded(crawler);
    crawlingNode.actions[0].markActionStart(crawler);

    setTimeout(() => {
      crawlingNode.actions[0].markActionFinish(crawler);
      assert.ok(crawlingNode.actions[0].bindedTest.pass);
    }, 500);
  });
});
