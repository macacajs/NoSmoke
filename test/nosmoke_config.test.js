/* global describe it */

'use strict';

const assert = require('assert');
const Config = require('../lib/crawler/config');
let root = require('window-or-global');

describe('#Load Config', function() {

  it('load from customized location', function() {
    let config = new Config();
    root.cmdArgs = {};
    root.cmdArgs.config = './demo/crawler.config.yml';

    config.loadDefault();

    assert.ok(config.platform !== 'ios');
  });

  it('load from default location', function() {
    let config = new Config();
    root.cmdArgs = {};

    config.loadDefault();

    assert.ok(config.platform !== 'ios');
  });

  it('override config from args', function() {
    let config = new Config();
    root.cmdArgs = {};
    root.cmdArgs.config = './demo/crawler.config.yml';
    root.cmdArgs.deviceType = 'iphone 6 plus';

    config.loadDefault();

    assert.ok(config.deviceType === 'iphone 6 plus');
  });

});
