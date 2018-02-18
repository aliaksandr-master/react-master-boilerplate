/*eslint-env node*/

const path = require('path');
const values = require('lodash/values');
const minimist = require('minimist');
const trim = require('lodash/trim');
const target = require('./target.json');
const mapFactory = require('./utils/map');
const isDigit = require('./asserts/isDigit');
const availableValues = require('./asserts/availableValues');



const map = minimist(process.argv.slice(2));

module.exports = mapFactory(map, {
  defaultsConfigFile: path.resolve(__dirname, '..', mapFactory(map, { defaults: { 'config': '.config.default.json' } })('config')),
  defaults: {
    'target': target.LOCAL,
    'port': 7000,
    'logger': false,
    'host': 'localhost',
    'url': '/',
    'entries': 'index-main',
    'coverage': false,
    'polling': false,
    'test-in-one-process': false,
    'test-progress': true,
    'force-release': false,
    'compile-stat': false,
    'colors': true,
    'test-tracked': false,
    'progress': true,
    'linting': false,
    'minify': null,
    'source-map': true,
    'mock-proxy-address': 'http://ads.dev.splitmetrics.com/api/',
    'mock-proxy-token': 'XXfVaN3nNSdYTdvXpQKbTa'
  },
  filter: {
    'port': Number,
    'logger': Boolean,
    'linting': Boolean,
    'coverage': Boolean,
    'test-progress': Boolean,
    'colors': Boolean,
    'test-in-one-process': Boolean,
    'polling': Boolean,
    'source-map': Boolean,
    'progress': Boolean,
    'compile-stat': Boolean,
    'test-tracked': Boolean,
    'force-release': Boolean,
    'minify': Boolean,
    'entries': (value) => value ? trim(value).split(/\s*,\s*/).filter(Boolean) : null
  },
  validate: {
    'target': availableValues('target', values(target)),
    'port': isDigit('port')
  }
});
