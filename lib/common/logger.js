'use strict';

const EventEmitter = require('wolfy87-eventemitter');
const logger = require('xlogger');
const fs = require('fs');
const root = require('window-or-global');
const macacaReporterRender = require('macaca-reporter/lib/render');
const options = {
  logToStd: true,
  closeFile: true
};

if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.eventEmmiter.addListener('onScreenRefresh', (data) => {
  let fileDir = __dirname + '/../../reports/' + Math.floor(Date.now() / 1000) + '.png';
  console.log('refresh screen at: ' + fileDir);
  require("fs").writeFile(fileDir, data.value, 'base64', function () {
    const templateData = require('macaca-reporter/test/mock');
    templateData.current.image = fileDir;
    templateData.current.list = [];
    templateData.current.list.push({'title':'node title','value':data.currentNode.digest});
    templateData.current.list.push({'title':'actions','value':JSON.stringify(data.currentNode.actions)});
    macacaReporterRender(templateData, {});
  });
});

module.exports = logger.Logger(options);
module.exports.middleware = logger.middleware(options);
