'use strict';

const logger = require('xlogger');
const Simulator = require('ios-simulator');
const exec = require('child_process').exec;
const root = require('window-or-global');
const path = require('path');
const _ = require('macaca-utils');

const options = {
  logToStd: true,
  closeFile: true
};

async function filterDeviceLogs(crawlerConfig) {

  if (!root.crawlingDateStamp) {
    logger.error('root timestamp not configured, abort setup logger');
    return;
  }

  _.mkdir(path.join(process.cwd(), 'reports'));
  let cmd = '';

  if (crawlerConfig.platform.toLowerCase() === 'ios') {
    logger.info('generating ios logs');

    if (!crawlerConfig.deviceName && !crawlerConfig.udid) {
      logger.info('invalid device config, both the udid and device name is not provided');
      return;
    }

    let udid = crawlerConfig.udid;
    udid || (udid = await getSimulatorUDID(crawlerConfig.deviceName));

    if (udid.length === 40 && !udid.includes('-')) {
      // device control
      cmd = `idevicesyslog -u ${udid} > ${path.join(process.cwd(), 'reports', root.crawlingDateStamp)}/ios.log &`;
    } else {
      // simulator control
      cmd = `xcrun simctl spawn ${udid} log stream > ${path.join(process.cwd(), 'reports', root.crawlingDateStamp)}/ios.log &`;
    }
  } else if (crawlerConfig.platform.toLowerCase() === 'android') {
    logger.info('generating android logs');

    if (!crawlerConfig.deviceName && !crawlerConfig.udid) {
      logger.info('invalid device config, both the udid and device name is not provided');
      return;
    }

    cmd = `adb -s ${crawlerConfig.deviceName || crawlerConfig.udid} logcat > ${path.join(process.cwd(), 'reports', root.crawlingDateStamp)}/android.log &`;
    logger.info(`log execution => ${cmd}`);

  } else {
    logger.info('invalid platform information');
  }

  logger.debug(`log execution => ${cmd}`);
  let script = cmd ? exec(cmd) : '';

  return new Promise((resolve) => {
    resolve(script);
  });
}

async function getSimulatorUDID(deviceName) {
  const devices = await Simulator.getDevices();
  const availableDevices = devices.filter(device => device.available);
  let matchedDevice = null;

  logger.debug(`Get available devices ${JSON.stringify(availableDevices)}`);

  const deviceString = deviceName;

  _.each(availableDevices, device => {
    if (device.name === deviceString) {
      matchedDevice = device;
    }
  });

  return matchedDevice.udid;
}

module.exports = logger.Logger(options);
module.exports.middleware = logger.middleware(options);
module.exports.filterDeviceLogs = filterDeviceLogs;
