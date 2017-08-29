'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const rootRouter = new Router();

module.exports = function(app) {
  rootRouter
    .get('/', function *(next) {
      console.log('verify:' + JSON.stringify(app.options));
      this.body = fs.readFileSync(path.join(__dirname, '../reports', 'index.html'), 'utf8');
      yield next;
    });

  app
    .use(rootRouter.routes());
};
