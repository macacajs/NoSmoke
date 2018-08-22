'use strict';

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const Router = require('koa-router');
const macacaReporterRender = require('macaca-reporter/lib/render');

const macacaReportTemplate = require('../crawler/reporterTemplate');

const rootRouter = new Router();

let root = require('window-or-global');
root.mockData = require('macaca-reporter/test/mock');
let date = new Date();
root.crawlingDateStamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

macacaReportTemplate.initialize();

const _ = require('../common/helper');

const detectPort = _.detectPort;

const server = require('http').createServer();
const io = require('socket.io')(server);

let socketed = false;

module.exports = function(app) {

  rootRouter.get('/', function *(next) {
    if (this.originalUrl !== '/') {
      return;
    }

    if (socketed) {
      /** Update content */
      this.body = fs.readFileSync(path.join(process.cwd(), 'reports', root.crawlingDateStamp + '-report.html'), 'utf8');
      yield next;
      return;
    } else {
      socketed = true;
    }

    var port = yield detectPort(app.options.port);

    /** Listen to port and update change */
    server.listen(port);

    /** Config interval for server emit event **/
    setInterval(() => {
      root.mockData.stats.duration = Date.now() - root.mockData.stats.start.getTime();
      root.mockData.stats.passPercent = (100 * root.mockData.stats.passes / (root.mockData.stats.tests ? root.mockData.stats.tests : 0)).toFixed(1);
      io.sockets.emit('update reporter', root.mockData);
    }, 30000);

    /** Config interval for update local report file **/
    setInterval(() => {
      macacaReporterRender(root.mockData, {
        socket: {
          server: `http://${_.ipv4}:${port}`
        },
        fileName: `${root.crawlingDateStamp}-report.html`
      });

      /* Synchronize report summary */
      let summary = path.join(process.cwd(), 'reports', `${root.crawlingDateStamp}-report-digest.json`);
      fs.writeFileSync(summary, JSON.stringify(root.mockData.stats), 'utf8');

    }, 30000);

    /** Detect port and render data */
    macacaReporterRender(root.mockData, {
      socket: {
        server: `http://${_.ipv4}:${port}`
      },
      fileName: `${root.crawlingDateStamp}-report.html`
    });

    /** Update content */
    this.body = fs.readFileSync(path.join(process.cwd(), 'reports', root.crawlingDateStamp + '-report.html'), 'utf8');
    yield next;
  });

  rootRouter.get('/:report/:resource', function *(next) {
    this.body = fs.readFileSync(path.join('.', 'reports', this.originalUrl));
    this.type = 'image/png';
    yield next;
  });

  app.use(rootRouter.routes());

};

/** Add event emmiter for picking up changes */
if (!root.eventEmmiter) {
  root.eventEmmiter = new EventEmitter();
}

root.eventEmmiter.addListener('screenRefresh', data => {
  let action = null;
  let i = 0;
  for (; i < data.currentNode.actions.length; i++) {
    if (data.currentNode.actions[i].isTriggered === false) {
      action = data.currentNode.actions[i];
      break;
    }
  }

  root.mockData.current.image = `${data.fileName}` ;
  root.mockData.current.list = [];
  root.mockData.current.list.push({
    'title': 'digest',
    'value': data.currentNode.digest
  });
  root.mockData.current.list.push({
    'title': 'actions-done',
    'value': i
  });
  root.mockData.current.list.push({
    'title': 'actions-total',
    'value': data.currentNode.actions.length
  });
  root.mockData.current.list.push({
    'title': 'action-path',
    'value': action ? action.location : 'all action cleared'
  });
  root.mockData.current.list.push({
    'title': 'depth',
    'value': data.currentNode.depth
  });
  root.mockData.current.list.push({
    'title': 'node-type',
    'value': data.currentNode.type
  });
  root.mockData.current.list.push({
    'title': 'action-description',
    'value': action ? JSON.stringify(action.source) : ''
  });
});

root.eventEmmiter.addListener('terminateCrawling', data => {
  // clean current bar
  root.mockData.current = null;
  macacaReporterRender(root.mockData, {
    fileName: `${root.crawlingDateStamp}-report.html`
  });

  /* Synchronize report summary */
  let summary = path.join(process.cwd(), 'reports', `${root.crawlingDateStamp}-report-digest.json`);
  fs.writeFileSync(summary, JSON.stringify(root.mockData), 'utf8');

  /* socket close */
  io.sockets.emit('disconnect', root.mockData);
  io.close();
  process.exit();
});
