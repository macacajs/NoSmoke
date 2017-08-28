'use strict';

const Router = require('koa-router');

const pgk = require('../package');
const render = require('./render');
const path = require('path');
const fs = require('fs');
const rootRouter = new Router();

module.exports = function(app) {
  rootRouter
    .get('/', function *(next) {
      console.log('verify:' + JSON.stringify(app.options));
      if (app.options.silent) {
        this.body = fs.readFileSync(path.join(__dirname, '../reports', 'index.html'), 'utf8');
      } else {
        this.body = yield render('index.html', {
          data: {
            title: pgk.name,
            version: pgk.version
          }
        });
      }

      yield next;
    });

  app
    .use(rootRouter.routes());
};
