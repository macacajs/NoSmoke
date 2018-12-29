/* global describe it */

'use strict';

const assert = require('assert');

const NSCrawlerConfig = require('../lib/crawler/config');

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

const utils = require('../lib/crawler/ocr-impl/ocr-utils');
describe('#Check device relative device density', function () {
  it('check iphone 4', function () {
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 4'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone4'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 4s'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone4s'), 2);
  });

  it('check iphone 5', function () {
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 5'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone5'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 5s'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 5 s'), 2);
  });

  it('check iphone 6 plus', function () {
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 6 +'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 6s +'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 6s plus'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 6 plus'), 3);
  });

  it('check iphone 7 plus', function () {
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 7 +'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 7s +'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 7s plus'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone 8 plus'), 3);
  });

  it('check iphone x', function () {
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone x'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone x s'), 3);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone x r'), 2);
    assert.equal(utils.convert_iOS_DIPToPXRatio('iphone xc max'), 3);
  });

});
