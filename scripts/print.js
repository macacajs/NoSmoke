#!/usr/bin/env node

'use strict';

const _ = require('../lib/common/helper');

const {
  chalk
} = _;

const EOL = require('os').EOL;
const logo = require('macaca-logo');

const pkg = require('../package');

console.log('');
logo.print();
console.log(`${chalk.white('Macaca was successfully installed! Please visit: ')}${chalk.cyan(pkg.homepage)}${EOL}`);
