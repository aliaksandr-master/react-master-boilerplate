import reduce from 'lodash/reduce';
import cloneDeep from 'lodash/cloneDeep';
import isError from 'lodash/isError';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import uSymbol from 'usymbol';
import getAuth from '../resources/local/session/get'; // circular dependency! it was solved by using another transport in this resource\
import promiseResolveObjechAll from '../lib/promise-all-object';
import { throwHiddenError, logError } from '../lib/log';
import { ERROR_TYPE } from '../config/constants';
import { Response } from '../vendor/multi-routing-api';
import deepFilter from '../filters/deep-filter';
import TransportApi from './TransportApi';
import parseErrors from './parse-errors';



const cleanupData = deepFilter((v, k) => !/^[_$]/.test(k));

export default class TransportAuthJSON extends TransportApi {
  _requestCall (method, address, data, options) {
    if (options.stub200 && __ASSERTS_ENABLED__) {
      return Promise.resolve(new Response({
        ok: true,
        status: 200,
        options,
        result: isFunction(options.stub200) ? options.stub200(method, address, data, options) : cloneDeep(options.stub200)
      }));
    }

    return super.request(method, address, data, options);
  }

  _request (method, address, data, options) {
    return getAuth().then(({ result: { type, token } }) => {
      options = {
        ...options,
        credentials: 'omit',
        headers: {
          Authorization: `${type} ${token}`,
          ...(options.headers || {})
        }
      };

      if (method === 'LIST_GET') {
        return this._requestCall('GET', address, data, options)
          .then((response) => {
            const { results = [], count = 0 } = response.result;

            response.result = results;
            response.listInfo = { total: count, count: results.length };

            return response;
          });
      }

      if (method === 'LIST_POST') {
        return this._requestCall('POST', address, { data }, options)
          .then((response) => {
            if (response.ok) {
              const { results, count } = response.result;

              if (!Array.isArray(results)) {
                throwHiddenError('invalid results for LIST_POST request. must be array');
              }

              response.result = results;
              response.listInfo = { count };
            }

            return response;
          });
      }

      if (method === 'LIST_DELETE') {
        return this._requestCall('DELETE', address, { uuids: data }, options)
          .then((response) => {
            if (response.ok) {
              response.result = [];
              response.listInfo = { count: 0 };
            }

            return response;
          });
      }

      return this._requestCall(method, address, data, options);
    });
  }

  request (method, address, data, options) {
    if (isArray(data) || isPlainObject(data)) {
      data = cleanupData(data);
    }

    let promise = this._request(method, address, data, options);

    if (options.prepareResponse) {
      promise = promise.then((response) => {
        response = options.prepareResponse(response);

        return response;
      });
    }

    promise = promise.then((response) => {
      response.errors = parseErrors(response);

      return response;
    });

    if (options.prepareResult != null) {
      promise = promise.then((response) => {
        const result = options.prepareResult(response.result, response);

        if (result && isFunction(result.then)) {
          promise = result.then((result) => {
            response.result = result instanceof Response ? result.result : result;

            return response;
          });
        } else if (isArray(result) || isPlainObject(result)) {
          promise = promiseResolveObjechAll(result)
            .then((result) => {
              response.result = reduce(result, (result, val, name) => {
                result[name] = val instanceof Response ? val.result : val;

                return result;
              }, Array.isArray(result) ? [] : {});

              return response;
            });
        }

        return promise.catch((err) => {
          response.result = null;
          response.ok = false;
          response.status = 0; // TODO: make it like constant

          if (isError(err)) {
            response.errors = [
              ...response.errors,
              {
                $id: uSymbol('INTERNAL_CLIENT_ERROR'),
                message: 'Ooops, something went wrong',
                type: ERROR_TYPE.CLIENT_ERROR,
                typed_params: {
                  error: err
                }
              }
            ];

            return response;
          }

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

        const response = new Response({
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
