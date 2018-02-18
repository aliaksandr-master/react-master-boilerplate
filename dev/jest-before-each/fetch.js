/* eslint-env node, eslint-env browser, jest*/

window.fetch = global.fetch = require('jest-fetch-mock');
