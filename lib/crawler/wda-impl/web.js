'use strict';

const path = require('path');
const htmlparser = require('htmlparser2');
const root = require('window-or-global');

const NSCrawler = require('./crawler').NSCrawler;

NSCrawler.prototype.insertXPath = function(parent, child) {

};

NSCrawler.prototype.performAction = function(actions) {

  for (let i = 0; i < actions.length; i++) {
    let action = actions[i];
    if (!action.isTriggered) {
      action.isTriggered = true;

      this.currentAction = action;
      root.updatePassedTestsCount();

      return new Promise((resolve, reject) => {
        /** conduct action based on configurable types */
        console.log(action.source);
        if (this.config.clickTypes.indexOf(action.source.type) >= 0) {
          /** 1. handle click actions */

          if (action.source.attribs && action.source.attribs.href) {
            let href = action.source.attribs.href;
            if (href.startsWith('//')) {
              href = 'https:' + href;
            } else if ((href.startsWith('.') || href.startsWith('/') || /^[a-zA-Z]+$/.test(href)) && href.length > 1) {
              let matches = this.currentNode.url.match(/:\/\/(.[^/]+)/);
              let protocol = this.currentNode.url.split('://')[0];
              href = path.join(protocol + '://', matches[1], href);
            } else {
              href = '';
            }

            let stop = false;
            for (let i = 0; i < this.config.blacklist.length && !stop; i++) {
              if (href.indexOf(this.config.blacklist[i]) >= 0) {
                href = '';
                stop = true;
              }
            }

            /** Trigger click only if the link is valid */
            if (href.length > 0) {
              console.log(href);
              root.wdclient.send('/wd/hub/session/' + this.sessionId + '/url', 'POST', {url: href }, () => {
                this.refreshScreen(action).then(() => {
                  setTimeout(() => {
                    resolve();
                  }, this.config.newCommandTimeout * 1000);
                });
              });
            } else {
              resolve();
            }
          }
        } else {
          /** 4. by default, should also resolve and proceed */
          setTimeout(() => {
            resolve();
          }, this.config.newCommandTimeout * 1000);
        }
      });
    }
  }
};

NSCrawler.prototype.beforeExplore = function(source) {
  let raw = source.value.replace(/\n|\r|\\n/gi, '');
  let that = this;
  let handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error) {
      console.log('parsing error: ' + error);
    } else {
      let target = dom[dom.length - 1].children[dom[dom.length - 1].children.length - 1];
      source.value = target;
      that.explore(source);
    }
  }, {
    verbose: false,
    ignoreWhitespace: true
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(raw);
};

exports.NSCrawler = NSCrawler;
