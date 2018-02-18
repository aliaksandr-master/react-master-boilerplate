/*eslint-env node*/

const path = require('path');
const moment = require('moment');
const values = require('lodash/values');
const pkg = require('../package.json');
const environments = require('./target.json');
const nodeEnv = require('./node-env.json');
const argv = require('./argv');



const CWD = path.resolve(__dirname, '..');
const DIR_TMP = '.tmp';
const DIR_VAR = '.var';


const cfg = {};

cfg.JIRA_TASK_PREFIX = 'SOME';

cfg.NODE_ENV = process.env.NODE_ENV || nodeEnv.DEV; // eslint-disable-line no-process-env

if (!values(nodeEnv).includes(cfg.NODE_ENV)) {
  throw new Error(`invalid NODE_ENV "${cfg.NODE_ENV}"`);
}

cfg.MINIFY = argv('minify');
cfg.FORCE_RELEASE = argv('force-release');
cfg.RUNTIME_LOGGER = argv('logger');
cfg.PACKAGE = pkg;
cfg.ENV = argv('target');
cfg.DEV_SERVER_PORT = argv('port');
cfg.DEV_SERVER_HOST = argv('host');
cfg.DEV_URL = `http://${cfg.DEV_SERVER_HOST}:${cfg.DEV_SERVER_PORT}${argv('url')}`;
cfg.ENTRIES = argv('entries');
cfg.POLLING_WATCH = argv('polling');

cfg.WEBSTORM_OPEN_FILE_PORT = 8091;

cfg.CWD = CWD;
cfg.DIR_COVERAGE = `${DIR_VAR}/test-coverage-report/lcov-report`;
cfg.DIR_BABEL_CACHE_DIR = `${DIR_TMP}/babel/${argv.$hash}`;
cfg.DIR_JEST_CACHE = `${DIR_TMP}/jest-cache/${argv.$hash}`;
cfg.DIR_ESLINT_CACHE = 'node_modules/.cache/eslint-loader';
cfg.DIR_SETTINGS_RELEASED = `${DIR_VAR}/settings-released-${cfg.ENV}`;
cfg.DIR_RELEASE = `${DIR_VAR}/release`;
cfg.FILE_S3_CACHE = `${DIR_TMP}/s3/cache-${cfg.ENV}.json`;
cfg.DIR_SRC = 'app';
cfg.DIR_SYS = 'dev';
cfg.FILE_REV_MANIFEST = 'rev-manifest.json';
cfg.DIR_IMAGES = `${cfg.DIR_SRC}/images`;

cfg.DEV_PROGRESS = argv('progress');
cfg.DEV_SOURCE_MAP = argv('source-map');
cfg.DEV_LINTING_ENABLED = argv('linting');
cfg.COMPILE_STAT = argv('compile-stat');

cfg.TEST_COVERAGE_ENABLED = argv('coverage');
cfg.TEST_ONE_PROCESS = argv('test-in-one-process');
cfg.TEST_PROGRESS = argv('test-progress');
cfg.COLORS = argv('colors');
cfg.TEST_ONLY_TRACKED = argv('test-tracked');
cfg.ESLINT_CACHE_FILE = `${cfg.CWD}/${DIR_TMP}/${argv.$hash}/eslint-cache/eslint.cache.json`;
cfg.ESLINT_CONFIG_FILE = `${cfg.CWD}/.eslintrc.json`;

cfg.MOCK_PROXY_SETTINGS_FILE = path.resolve(cfg.CWD, DIR_TMP, `mock-proxy/${argv.$hash}/settings.json`);
cfg.MOCK_PROXY_TARGET_BASIC_URL = argv('mock-proxy-address');
cfg.MOCK_PROXY_AUTH_TOKEN = argv('mock-proxy-token');
cfg.MOCK_PROXY_URL = `http://${cfg.DEV_SERVER_HOST}:${cfg.DEV_SERVER_PORT}/-mock-proxy-/api`;

// provide into code
cfg.__APP_STAMP__ = `v${cfg.PACKAGE.version} - ${cfg.ENV} [${moment().format('DD-MM-YYYY HH:mm')}]`;

cfg.__ASSERTS_ENABLED__ = cfg.NODE_ENV !== nodeEnv.PROD;

cfg.__SENTRY_DSN__ = null;

if (cfg.ENV === environments.PROD) {
  cfg.__SENTRY_DSN__ = 'https://d55f36a8cf70432c82c7837c54784f5d:0ad2fa5cf16741839bb6606d9e243061@sentry.splitmetrics.com/21';
} else if (cfg.ENV === environments.DEV) {
  cfg.__SENTRY_DSN__ = 'https://fde9c3bee3004ed3b42d367fab1339b5:5c23912c7c444c79ba1c95df542bae7f@sentry.splitmetrics.com/20';
}

module.exports = cfg;
