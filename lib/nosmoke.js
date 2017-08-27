'use strict';

const chalk = require('chalk');
const detect = require('detect-port');

const Server = require('./server');
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

function *openBrowser(url) {
  var platform = process.platform;
  var linuxShell = platform === 'linux' ? 'xdg-open' : 'open';
  var openShell = platform === 'win32' ? 'start' : linuxShell;
  yield _.exec(`${openShell} ${url}`);
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
      yield openBrowser(url);
    } else {
      console.log('----> silent mode <-------');
      yield require('../assets/index');
      yield openBrowser(url);
    }
  } catch (e) {
    console.log(e);
  }
};

