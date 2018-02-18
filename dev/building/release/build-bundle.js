/* eslint-env node */

const once = require('lodash/once');
const gutil = require('gulp-util');
const webpack = require('webpack');
const buildWebpackConfig = require('../../../webpack.config');



const statsSettings = {
  colors: true,
  reasons: true,
  warnings: false,
  publicPath: false,
  timings: false,
  performance: false,
  hash: false,
  modules: false,
  cached: false,
  assets: false,
  source: false,
  depth: false,
  chunks: false,
  children: false,
  chunkOrigins: false,
  entrypoints: false,
  maxModules: 3
};

module.exports = (callback) => {
  callback = once(callback);

  webpack(buildWebpackConfig, (error, stats) => {
    if (error || stats.hasErrors()) { // fatal error
      const formattedError = new gutil.PluginError('webpack', error || stats.toString(statsSettings));

      callback(formattedError);
      return;
    }

    callback();
  });
};
