/* global describe it */

'use strict';

const assert = require('assert');
const Template = require('../lib/crawler/reporterTemplate');
let root = require('window-or-global');

describe('#Load Template', function() {

  it('Initialization should success', function() {
    Template.initialize();
    assert.ok(root.mockData != null, 'reporterTemplate initialisation should create mock data for root');
  });

  it('Suite should return valid JSON object', function() {
    let suite = Template.suite();
    assert.ok(suite != null, 'reportTemplate should create an non null value');
  });

  it('Suite should be able to process assertion', function() {
    Template.updateAssertion({digest: 'digest', given: 'given', then: 'then', isSuccess: true});
    assert.ok(root.assertTest.passes.length === 1);
    assert.ok(root.assertTest.failures.length === 0);
    Template.updateAssertion({digest: 'digest', given: 'given', then: 'then', isSuccess: false});
    assert.ok(root.assertTest.failures.length === 1);

    root.updatePassedTestsCount();
  });

});
