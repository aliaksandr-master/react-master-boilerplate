/* eslint-env node */

const path = require('path');
const url = require('url');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const assignIn = require('lodash/assignIn');
const startsWith = require('lodash/startsWith');
const find = require('lodash/find');
const chalk = require('chalk');
const glob = require('glob');
const globalConfig = require('../../config');
const proxy = require('./proxy');



module.exports = (proxyConfigs) => {
  const configs = map(proxyConfigs, (config) => {
    const local = url.parse(config.local);
    const remote = url.parse(config.remote);

    return assignIn({}, config, { remote, local });
  });

  const actions = {};

  let mocks = {};

  actions.setMocks = (activeMocks) => {
    console.log('set mocks', activeMocks); // eslint-disable-line no-console
    mocks = activeMocks;
  };

  const middleware = (req, res) => {
    const config = find(configs, (proxyConfig) => startsWith(req.url, proxyConfig.local.path));

    if (!config) {
      console.log(chalk.red('[UNDEFINED PROXY REQUEST]'), req.url, 'must be: ', JSON.stringify(configs.map((conf) => conf.local))); // eslint-disable-line no-console
      res.writeHead(404);
      res.end();
      return;
    }

    const proxyHeaders = {
      resource: req.get('x-resource'),
      method: req.get('x-action')
    };

    const mock = mocks[`${proxyHeaders.resource}:${proxyHeaders.method}`];

    if (proxyHeaders.resource && proxyHeaders.method) {
      res.append('Cache-Control', 'no-cache');
    }

    if (mock) {
      const mockDir = path.resolve(globalConfig.CWD, globalConfig.DIR_SRC, 'api/resources', `${proxyHeaders.resource}/__responses__/${proxyHeaders.method}/`);
      const mockFile = path.join(mockDir, `${mock}.{js,json}`);

      const file = glob.sync(mockFile)[0];

      delete require.cache[file]; // eslint-disable-line fp/no-delete

      if (!file) {
        proxy.error(req, res, `file is undefined "${mockFile}"`);
        return;
      }

      const response = require(file); // eslint-disable-line global-require, import/no-dynamic-require

      res.append('x-mock', mock);

      forEach(response.headers || {}, (headerV, headerK) => {
        res.append(headerK, headerV);
      });

      res.status(response.status || 200).send(response.body);

      proxy.log(req, res, mock);
      return;
    }

    req.url = req.url.replace(config.local.path, '/');

    proxy.init(req, res, config);

    proxy.load(req, res, (err) => {
      if (err) {
        proxy.error(req, res);
        return;
      }

      proxy.log(req, res, mock);
    });
  };

  return { middleware, actions };
};
