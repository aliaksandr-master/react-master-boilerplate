/* eslint-env node */

const express = require('express');
const gutil = require('gulp-util');
const options = require('../config');
const mockServer = require('../server-mock-proxy');
const bundleHmrServer = require('../server-bundle-hmr');
const coverageServer = require('../server-coverage');
const sandboxServer = require('../server-sandbox');
const imagesServer = require('../server-images');
const indexServer = require('../server-index');
const staticServer = require('../server-static');
// const morgan = require('morgan');



module.exports = (callback) => {
  const app = express();

  // app.use(morgan('tiny')); // logger
  app.use(indexServer);
  app.use('/-sandbox-', sandboxServer);
  app.use('/-mock-proxy-', mockServer);
  app.use('/-coverage-', coverageServer);
  app.use('/-images-', imagesServer);
  app.use(bundleHmrServer);
  app.use(staticServer);

  app.listen(options.DEV_SERVER_PORT, (err) => {
    if (err) {
      callback(err);
      return;
    }

    gutil.log('[webpack-dev-server]', `'http://${options.DEV_SERVER_HOST}:${options.DEV_SERVER_PORT}/`);

    callback();
  });
};
