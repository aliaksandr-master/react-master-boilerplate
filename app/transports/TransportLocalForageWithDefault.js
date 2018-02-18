import cloneDeep from 'lodash/cloneDeep';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import uSymbol from 'usymbol';
import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';
import { DB_VERSION, AUTH_TOKEN } from '../config';
import { ERROR_TYPE } from '../config/constants';
import promiseResolveObjechAll from '../lib/promise-all-object';
import { Response } from '../vendor/multi-routing-api';
import deepFilter from '../filters/deep-filter';
import { logError } from '../lib/log';
import TransportLocal from './TransportLocal';



let userMarker = AUTH_TOKEN || 'GUEST';
const SESSION_ADDRESS = '/session';
const DB_VERSION_ADDRESS = '/db-version';

const cleanupData = deepFilter((v, k) => !/^[_$]/.test(k));


export default class TransportLocalForageWithDefault extends TransportLocal {
  constructor (...args) {
    super(...args);

    this.storageGet(DB_VERSION_ADDRESS).then((result) => {
      let promise = Promise.resolve();

      if ((result == null || String(result) !== String(DB_VERSION)) && this._connection) {
        promise = Promise.resolve(this._connection.clear());
      }

      promise.then(() => {
        this.storageSet(DB_VERSION_ADDRESS, String(DB_VERSION));
      });
    });
  }

  prepareStorageAddress (address) {
    if (address === SESSION_ADDRESS || address === DB_VERSION_ADDRESS) {
      return address;
    }

    return `/USER/${userMarker}/${String(address).replace(/^\//, '')}`;
  }

  storageSet (address, data) {
    if (address === SESSION_ADDRESS) {
      userMarker = String(data.token).toUpperCase();
    }

    return super.storageSet(address, data);
  }

  storageUnset (address, data) {
    if (address === SESSION_ADDRESS) {
      userMarker = AUTH_TOKEN || 'GUEST';
    }

    return super.storageSet(address, data);
  }

  PATCH_OR_POST (address, data, options) {
    return this.GET(address, null, options)
      .then((response) => {
        data = { ...response.result, ...data };

        return this.PUT(address, data, options)
          .then((response) => {
            if (!response.ok) {
              return this.POST(address, data, options);
            }

            return response;
          });
      });
  }

  request (method, address, data, options) {
    if (isArray(data) || isPlainObject(data)) {
      data = cleanupData(data);
    }

    let promise = null;

    if (options.defaults != null) {
      promise = super.request(method, address, data, options)
        .then((response) => {
          if (!response.ok && response.status === 404) {
            response.ok = true;
            response.status = 200;
            response.result = isFunction(options.defaults) ? options.defaults(method, address, data, options) : cloneDeep(options.defaults);
          }

          return response;
        });
    } else {
      promise = super.request(method, address, data, options);
    }

    if (options.prepareResponse) {
      promise = promise.then((response) => {
        response = options.prepareResponse(response);

        return response;
      });
    }

    if (options.prepareResult != null) {
      promise = promise.then((response) => {
        if (response.result && isFunction(response.result.then)) {
          return response.result.then((result) => {
            response.result = result instanceof Response ? result.result : result;

            return response;
          });
        }

        return promiseResolveObjechAll(options.prepareResult(response.result, response))
          .then((result) => {
            response.result = reduce(result, (result, val, name) => {
              result[name] = val instanceof Response ? val.result : val;

              return result;
            }, Array.isArray(result) ? [] : {});

            return response;
          });
      });
    }

    promise = promise
      .catch((err) => {
        if (err instanceof Response) {
          err.ok = false;
          err.status = null;
          return err;
        }

        logError(err);

        const response =  new Response({
          ok: false,
          status: 600,
          result: null,
          listInfo: { total: 0, count: 0 },
          errors: [
            {
              $id: uSymbol('INTERNAL_CLIENT_ERROR'),
              message: 'Ooops, something went wrong',
              type: ERROR_TYPE.CLIENT_ERROR,
              typed_params: { error: err }
            }
          ]
        });

        //TODO: TEMPORARY
        response.status = null;
        return response;
      });

    return promise;
  }
}
