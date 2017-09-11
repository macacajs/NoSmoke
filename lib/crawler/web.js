'use strict';

let NSCrawler = require('./crawler').NSCrawler;
let htmlparser = require('htmlparser');
let Hooks = require('../../public/hooks').Hooks;
let hooks = new Hooks();

NSCrawler.prototype.insertXPath = function (parent, child) {

};

NSCrawler.prototype.performAction = function(actions) {
  this.refreshScreen();

  console.log(actions);
  if (!hooks.performAction(actions, this)) {
    for (let i = 0; i < actions.length; i++) {
      let action = actions[i];
      if (!action.isTriggered) {
        action.isTriggered = true;

        /** log and only log in the current progress */
        console.log(JSON.stringify(action.source));

        /** conduct action based on configurable types */
        if (this.config.clickTypes.indexOf(action.source.type) >= 0) {
          /** 1. handle click actions */
          root.wdclient.send('/wd/hub/session/' + this.sessionId + '/url', 'POST', {
            url: 'https://www.baidu.com/'
          }, null);

        } else if (this.config.horizontalScrollTypes.indexOf(action.source.type) >= 0) {
          /** 2. handle horizontal scroll actions */
          // root.wdclient
          //   .send(`/wd/hub/session/` +this.sessionId + `/dragfromtoforduration`,`post`, {
          //     fromX: 10,
          //     fromY: 200,
          //     toX: 300,
          //     toY: 200,
          //     duration: 2.00
          //   }, null);
        } else if (this.config.editTypes.indexOf(action.source.type) >= 0) {
          /** 3. handle edit actions */
          // root.wdclient
          //   .send(`/wd/hub/session/` +this.sessionId + `/element/` + data.value.ELEMENT +`/value`,`post`, {
          //     'value': [action.input]
          //   }, null);
        }

        return;
      }
    }
  }
};

NSCrawler.prototype.beforeExplore = function (source) {
  let raw = source.value.replace(/\n|\r|\\n/gi, '');
  console.log('start parsing');
  let that = this;
  let handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error) {
      console.log('parsing error: ' + error);
    } else {
      console.log('finish parsing');
      let target = dom[dom.length - 1].children[dom[dom.length - 1].children.length - 1];
      source.value = target;
      that.explore(source);
    }
  });
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(raw);
};

exports.NSCrawler = NSCrawler;
