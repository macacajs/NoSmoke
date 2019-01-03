/* global describe it */

'use strict';

const logger = require('../lib/common/logger');
const root = require('window-or-global');

describe('#Check Logger', function() {

  it('log for android', function(done) {
    this.timeout(10000);

    let config = {
      platform: 'android',
      deviceName: 'FA6A10315983'
    };

    let date = new Date();
    root.crawlingDateStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    logger.filterDeviceLogs(config).then((script_process) => {
      script_process.kill();
      done();
    });
  });

  it('log for ios simulator', function(done) {
    this.timeout(10000);
    let config = {
      platform: 'ios',
      udid: '0F778112-D5E7-45E5-A233-46E7D78F2669'
    };

    let date = new Date();
    root.crawlingDateStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

    logger.filterDeviceLogs(config).then((script_process) => {
      script_process.kill();
      done();
    });
  });
});
