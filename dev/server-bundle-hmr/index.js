/* eslint-env node */

const express = require('express');
const forEach = require('lodash/forEach');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const options = require('../config');
const webpackConfig = require('../../webpack.config');



webpackConfig.watchOptions = {
  ignored: [
    /scsslint_tmp[^.]+\.js/,
    /\/__tests__\//
  ]
};


const devServerConfig = {
  host: options.DEV_SERVER_HOST,
  port: options.DEV_SERVER_PORT,

  watch: true,
  hot: true,
  inline: true,

  quiet: false,
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: false,
  contentBase: webpackConfig.output.path,
  publicPath: '/',

  watchOptions: {}
};

if (options.POLLING_WATCH) { // hach for virtualbox watching problem solution http://andrewhfarmer.com/webpack-watch-in-vagrant-docker/
  webpackConfig.watchOptions = Object.assign({}, webpackConfig.watchOptions, {
    aggregateTimeout: 300,
    poll: true
  });
}

devServerConfig.watchOptions = webpackConfig.watchOptions;

webpackConfig.bail = false;
webpackConfig.devtool = options.DEV_SOURCE_MAP ? 'inline-source-map' : false;
webpackConfig.cache = true;
webpackConfig.watch = true;

webpackConfig.output.publicPath = '/';

webpackConfig.plugins.splice(webpackConfig.plugins.length - 2, 0, new webpack.HotModuleReplacementPlugin());

forEach(webpackConfig.entry, (entry) => {
  entry.unshift(
    'webpack-hot-middleware/client?overlay=true&reload=true'
  );
  // entry.unshift(
  //   'react-hot-loader/patch'
  // );
});


const app = express();


const compiler = webpack(webpackConfig);


app.use(WebpackDevMiddleware(compiler, devServerConfig));
app.use(WebpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));


module.exports = app;
