'use strict';

const _ = require('../common/helper');
let root = require('window-or-global');

module.exports = {
  suite: function() {
    let suite = {
      'title': '',
      'ctx': {},
      'suites': [],
      'tests': [],
      'pending': [],
      'root': false,
      '_timeout': 0,
      '_enableTimeouts': true,
      '_slow': 75,
      '_retries': 0,
      'delayed': false,
      '_eventsCount': 1,
      'uuid': '',
      'passes': [],
      'context': '',
      'children': [],
      'failures': [],
      'skipped': [],
      'totalTests': 0,
      'totalPasses': 0,
      'totalFailures': 0,
      'totalPending': 0,
      'totalSkipped': 0,
      'duration': 0,
      '_totalTime': 0
    };
    return JSON.parse(JSON.stringify(suite));
  },
  test: function() {
    let testCase = {
      'title': '',
      'fullTitle': '',
      'duration': 0,
      'state': 'pending',
      'pass': false,
      'fail': false,
      'pending': true,
      'context': '',
      'code': '',
      'skipped': false
    };
    return JSON.parse(JSON.stringify(testCase));
  },
  initialize: function() {
    // initialize stats
    root.mockData.stats.passes = 0;
    root.mockData.stats.tests = 0;
    root.mockData.stats.passPercent = 0;
    root.mockData.stats.duration = 0;
    root.mockData.stats.skipped = 0;
    root.mockData.stats.hasSkipped = false;
    root.mockData.suites = {};
    root.mockData.current.list = [{'title': 'status', 'value': 'initialization'}];

    // initialize suites
    root.mockData.suites = this.suite();
    root.mockData.suites.title = 'Root';
    root.mockData.suites.uuid = _.uuid();
    root.mockData.suites.root = true;
  },
  updateAssertion: function(context) {
    if (!root.assertTest) {
      // push assertion
      let reportSuite = this.suite();
      reportSuite.title = 'Assertion Check:';
      reportSuite.uuid = `${_.uuid()}`;

      let shell = this.suite();
      shell.uuid = _.uuid();
      shell.suites.push(reportSuite);
      root.mockData.suites.suites.splice(0, 0, shell);
      root.assertTest = reportSuite;
    }

    let test = this.test();
    test.title = `View: ${context['digest']}: ${context['given']} -> ${context['then']}`;
    test.fullTitle = `View: ${context['digest']}: ${context['given']} -> ${context['then']}`;
    test.code = JSON.stringify(context);
    test.pending = false;
    root.assertTest.totalTests++;
    root.mockData.stats.tests++;
    root.assertTest.tests.push(test);

    if (context.isSuccess) {
      root.assertTest.passes.push(test);
      test.stats = 'passed';
      test.pass = true;
      root.mockData.stats.passes++;
      root.assertTest.totalPasses++;
    } else {
      test.stats = 'failed';
      test.fail = true;
      root.assertTest.failures.push(test);
      root.mockData.stats.failures++;
      root.assertTest.totalFailures++;
    }
  }
};
