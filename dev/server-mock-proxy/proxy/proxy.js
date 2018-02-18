/* eslint-env node */

const once = require('lodash/once');
const chalk = require('chalk');
const httpProxy = require('http-proxy');



let proxiesByHref = {};

exports.clean = () => {
  proxiesByHref = {};
};

exports.init = (req, res, config) => {
  const href = config.remote.href;

  if (!proxiesByHref.hasOwnProperty(href)) {
    const proxy = httpProxy.createProxyServer({
      changeOrigin: true,
      prependPath: true,
      autoRewrite: true,
      hostRewrite: true,
      target: href,
      xfwd: true
    });

    proxy.on('proxyRes', (proxyRes, req, _res) => {
      if (req.$$proxyCallback) {
        req.$$proxyCallback(null, proxyRes);
        req.$$proxyCallback = null;
      }
    });

    proxiesByHref[href] = proxy;
  }

  req.$$proxy = proxiesByHref[href];
};

exports.load = (req, res, callback) => {
  req.$$proxyCallback = once(callback);

  req.$$proxy.web(req, res, req.$$proxyCallback);
};

exports.error = (req, res, reason) => {
  console.error(chalk.red('[ERROR PROXY]'), req.url, chalk.red(reason)); // eslint-disable-line no-console
  res.writeHead(504);
  res.end();
};

exports.log = (req, res, mock = '') => {
  const method = req.method.toUpperCase();

  console.log( // eslint-disable-line no-console
    chalk.blue('<PROXY>'),
    mock ? chalk.yellow(`[MOCKED:${mock}]`) : '',
    res.statusCode >= 400 ? chalk.red(req.url.replace(/^\/*/, '/')) : req.url.replace(/^\/*/, '/'),
    chalk[res.statusCode >= 400 ? 'red' : 'green'](`[${method}:${res.statusCode}]`)
  );
};
