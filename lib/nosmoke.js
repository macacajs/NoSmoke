'use strict';

const opn = require('opn');
const chalk = require('chalk');
const detect = require('detect-port');

const Server = require('./server/server');
const _ = require('./common/helper');
const logger = require('./common/logger');

function *parseOptions(options) {
  var port = yield detect(options.port);

  if (port !== parseInt(options.port, 10)) {
    logger.info('port: %d was occupied, changed port: %d', options.port, port);
    options.port = port;
  }
}

function *initDevice(options) {
  const udid = options.udid;
  console.log(`udid: ${udid}`);
}

module.exports = function *(options) {
  try {
    yield parseOptions(options);
    const server = new Server(options);
    yield server.start();
    const url = `http://${_.ipv4}:${options.port}`;
    logger.debug(`server start at: ${url}`);
    yield initDevice(options);
    global.serverStarted = true;
    logger.info(`NoSmoke start at: ${chalk.white(url)}`);

    if (!options.silent) {
      console.log('----> browser mode <-------');
    } else {
      console.log('----> silent mode <-------');
      yield require('./crawler/index');
      yield opn(url);
    }
  } catch (e) {
    console.log(e);
  }
};

