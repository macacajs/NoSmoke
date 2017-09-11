'use strict';

let NSCrawler = require('./crawler').NSCrawler;
let htmlparser = require('htmlparser');
let Hooks = require('../../public/hooks').Hooks;
const path = require('path');
let hooks = new Hooks();

NSCrawler.prototype.insertXPath = function (parent, child) {

};

NSCrawler.prototype.performAction = function(actions) {
  this.refreshScreen();

  if (!hooks.performAction(actions, this)) {
    for (let i = 0; i < actions.length; i++) {
      let action = actions[i];
      if (!action.isTriggered) {
        action.isTriggered = true;

        /** conduct action based on configurable types */
        if (this.config.clickTypes.indexOf(action.source.type) >= 0) {
          /** 1. handle click actions */
          if (action.source.attribs && action.source.attribs.href) {
            let href = action.source.attribs.href;
            if (href.startsWith('//')) {
              href = 'https:' + href;
            } else if ((href.startsWith('.') || href.startsWith('/')) && href.length > 1) {
              let matches = this.currentNode.url.match(/:\/\/(.[^/]+)/);
              console.log(matches);
              href = path.join('https://', matches[1], href);
            } else {
              href = '';
            }

            if (href.indexOf('github.com') > 0) {
              href = '';
            }

            /** Trigger click only if the link is valid */
            if (href.length > 0) {
              console.log(href);
              root.wdclient.send('/wd/hub/session/' + this.sessionId + '/url', 'POST', {
                url: href
              }, null);
            }
          }
        } else if (this.config.horizontalScrollTypes.indexOf(action.source.type) >= 0) {
          /** 2. handle horizontal scroll actions */

        } else if (this.config.editTypes.indexOf(action.source.type) >= 0) {
          /** 3. handle edit actions */

        }
        return;
      }
    }
  }
};

NSCrawler.prototype.beforeExplore = function (source) {
  let raw = source.value.replace(/\n|\r|\\n/gi, '');
  let that = this;
  let handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error) {
      console.log('parsing error: ' + error);
    } else {
      let target = dom[dom.length - 1].children[dom[dom.length - 1].children.length - 1];
      source.value = target;
      that.explore(source);
    }
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(raw);
};

exports.NSCrawler = NSCrawler;
