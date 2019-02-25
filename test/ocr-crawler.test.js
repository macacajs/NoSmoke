/* global describe it */

'use strict';

const assert = require('assert');
const checkShouldBeExcluded = require('../lib/crawler/ocr-impl/ocr-crawler').NSCrawler.prototype.checkShouldBeExcluded;

describe('#Check checkShouldBeExcluded', function() {
  it('include', function() {
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'ma'}), true);
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'ca'}), true);
  });

  it('be included', function() {
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'macaca'}), true);
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'macacajs'}), true);
  });

  it('case insensitive', function() {
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'cA'}), true);
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'CA'}), true);
    assert.equal(checkShouldBeExcluded(['ma', 'ca'], {name: 'Macacajs'}), true);
  });

  it('contain blank', function() {
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: '银 弹'}), true);
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: ' 银银 弹 '}), true);
  });

  it('some false', function() {
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: 'reporter'}), false);
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: 'wd'}), false);
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: 'inspector'}), false);
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: '硬'}), false);
    assert.equal(checkShouldBeExcluded(['ma', '银弹'], {name: '核'}), false);
  });
});
