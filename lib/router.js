'use strict';

const fs = require('fs');
const path = require('path');
const detectPort = require('detect-port');
const _ = require('./common/helper');
const macacaReporterRender = require('macaca-reporter/lib/render');
const EventEmitter = require('wolfy87-eventemitter');
const root = require('window-or-global');
const mockData = require('macaca-reporter/test/mock');

let server = require('http').createServer();
let io = require('socket.io')(server);
let socketed = false;
let connected = false;

module.exports = function(app) {

  app.use(function *() {

    if (socketed) {
      /** Update content */
      this.body = fs.readFileSync(path.join(__dirname, '../reports', 'index.html'), 'utf8');
      return;
    } else {
      socketed = true;
    }

    /** Detect port and render data */
    var port = yield detectPort(56788);
    macacaReporterRender(mockData, {
      socket: {
        server: `http://${_.ipv4}:${port}`
      }
    });

    /** Update content */
    this.body = fs.readFileSync(path.join(__dirname, '../reports', 'index.html'), 'utf8');

    /** Listen to port and update change */
    server.listen(port);
    io.on('connection', function(socket) {
      if (connected === false) {
        connected = true;
        console.log('socket connected');
        setInterval(() => {
          console.log('update reporter');
          socket.broadcast.emit('update reporter', mockData);
        }, 2000);

        socket.on('disconnect', function() {});
      }
    });
  });
};

/** Add event emmiter for picking up changes */
if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.eventEmmiter.addListener('onScreenRefresh', (data) => {
  let fileName = Math.floor(Date.now() / 1000) + '.png';
  let fileDir = __dirname + '/../reports/' + fileName;
  require('fs').writeFile(fileDir, data.value, 'base64', function () {
    mockData.current.image = encodeURI('file://' + fileDir);
    mockData.current.list = [];
    mockData.current.list.push({'title': 'node title', 'value': data.currentNode.digest});
    mockData.current.list.push({'title': 'actions', 'value': JSON.stringify(data.currentNode.actions)});
  });
});
