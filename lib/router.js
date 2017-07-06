'use strict';

const Router = require('koa-router');

const pgk = require('../package');
const render = require('./render');

const rootRouter = new Router();

module.exports = function(app) {
 rootRouter
    .get('/', function *(next) {

      this.body = yield render('index.html', {
        data: {
          title: pgk.name,
          version: pgk.version
        }
      });

      yield next;
    });

  app
    .use(rootRouter.routes());
};
