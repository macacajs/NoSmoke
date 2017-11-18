'use strict';

const NSCrawler = require('./crawler').NSCrawler;

// Parent must be an array of child elements
NSCrawler.prototype.insertXPath = function (parent, child) {
  let prefix = this.config.platform === 'iOS' ? 'XCUIElementType' : '';

  /** scan and check index path for once and only once*/
  let currentTypeCount = child.type + '_count';
  if (!parent[currentTypeCount]) {
    for (let i = 0; i < parent.children.length; i++) {
      currentTypeCount = parent.children[i].type + '_count';
      if (!parent[currentTypeCount]) {
        parent[currentTypeCount] = 1;
      } else {
        parent[currentTypeCount]++;
      }
      parent.children[i].pathInParent = parent[currentTypeCount];
    }
  }

  let currentIndex = child.pathInParent;
  child.xpath = (parent.xpath ? parent.xpath : '//' + prefix + 'Application[1]') + '/' + prefix + child.type + '[' + currentIndex + ']';
};

exports.NSCrawler = NSCrawler;
