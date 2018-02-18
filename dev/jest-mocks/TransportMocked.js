/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import { Transport, Response } from 'multi-routing-api';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const url = require('url');

const resourcesCwd = path.resolve(__dirname, '../../app/api/resources');

const resolvers = {};

const TransportMocked = class extends Transport {
  storageGet () {
    return Promise.resolve();
  }

  storageSet () {
    return Promise.resolve();
  }

  storageRemove () {
    return Promise.resolve();
  }

  request (method, address, data, options) {
    const parsedURL = url.parse(address);
    const segments = (parsedURL.path || '').split('/').filter(Boolean);
    const pathname = segments.join('/');

    if (!resolvers.hasOwnProperty(pathname)) {
      while (segments.length > 0) {
        const filePath = path.resolve(resourcesCwd, segments.join('/'), '__resolve__/index.js');

        console.log(filePath);

        if (!fs.existsSync(filePath)) {
          segments.pop();
          continue;
        }

        resolvers[pathname] = require(filePath).default;
        break;
      }
    }

    const resolver = resolvers[pathname];

    if (typeof resolver !== 'function') {
      throw new Error(`TransportMocked (${method} ${address}): there is no __resolve__/index.js`);
    }

    return Promise.resolve(resolver(method, address, data, options, this.settings))
      .then((response) => {
        if (response instanceof Response) {
          return response;
        }

        if (response && response.ok != null && typeof response.status === 'number' && response.result !== undefined) {
          console.log(chalk.cyan(`Transport Completed: ${method} ${address} [${response.status}]`));
          return new Response(response);
        }

        throw new Error(`response must be instance of Response, ${Object.prototype.toString.call(response)} given (${response && JSON.stringify(response)})`);
      })
      .catch((rejection) => {
        throw new Error(`TransportMocked (${method} ${address}): ${String(rejection)}\n ${rejection && rejection.stack}`);
      });
  }
};

export default TransportMocked;
