'use strict';

const opn = require('opn');
const detect = require('detect-port');

const Server = require('./server/server');
const _ = require('./common/helper');
const logger = require('./common/logger');
const root = require('window-or-global');
const http = require('http');

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
    root.cmdArgs = options;
    yield parseOptions(options);
    const server = new Server(options);
    yield server.start();
    const url = `http://${_.ipv4}:${options.port}`;
    yield initDevice(options);
    yield require('./crawler/index');
    if (!options.silent) {
      yield opn(url);
    } else {
      http.get({host: _.ipv4, port: options.port});
    }
  } catch (e) {
    console.log(e);
  }
};

