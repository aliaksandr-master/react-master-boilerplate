import { Response } from 'multi-routing-api';
import uSymbol from 'usymbol';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import isString from 'lodash/isString';
import isPlainObject from 'lodash/isPlainObject';
import isError from 'lodash/isError';
import constant from '../lib/const';
import { ERROR_TYPE } from '../config/constants';
import identify from '../lib/identify';
import { throwHiddenError, logError } from '../lib/log';



const RESPONSE_ERROR_TYPES = constant('RESPONSE_ERROR_TYPES', {
  VALIDATION: 'validation_error',
  RESOURCE_NOT_FOUND: 'http404'
});



const getValidationErrors = () => (error) =>
  reduce(error, (errors, error, fieldName) => {
    if (fieldName === 'error_type' || fieldName === 'non_field_errors') {
      return errors;
    }

    if (Array.isArray(error)) {
      return errors.concat([
        {
          message: error[0],
          type: ERROR_TYPE.VALIDATION,
          typed_params: {
            field_name: fieldName
          }
        }
      ]);
    } else if (isPlainObject(error)) {
      return errors.concat(map(error, (message) => ({
        message: message[0],
        type: ERROR_TYPE.VALIDATION,
        typed_params: {
          field_name: fieldName
        }
      })));
    } else if (isString(error)) {
      return errors.concat([
        {
          message: error,
          type: ERROR_TYPE.VALIDATION,
          typed_params: {
            field_name: fieldName
          }
        }
      ]);
    }

    throwHiddenError('invalid validation error format');

    return errors;
  }, []).map(identify('error-id', 'id'));

const getServerErrors = () => (error) => (
  [
    {
      message: error.detail,
      type: ERROR_TYPE.RESOURCE_NOT_FOUND,
      typed_params: {},
      id: uSymbol('not_found')
    }
  ]
);



const errorTypeMap = {
  [RESPONSE_ERROR_TYPES.VALIDATION]: getValidationErrors(),
  [RESPONSE_ERROR_TYPES.RESOURCE_NOT_FOUND]: getServerErrors()
};



export default (response) => {
  if (!(response instanceof Response)) {
    throwHiddenError('Invalid response', { 'function': 'parse-errors' });
    return [];
  }

  if (response.ok) {
    return [];
  }

  if (response.status === 0) {
    return [ { id: 0, message: 'Connection error', type: ERROR_TYPE.CONNECTION_ERROR, typed_params: {} } ];
  }

  const error = response.result;

  //TODO FIX HANDLE SERVER ERROR
  if (response.status >= 500 || isError(error)) {
    return [ { id: 0, message: 'Server error', type: ERROR_TYPE.SERVER_ERROR, typed_params: {} } ];
  }

  if (!error.hasOwnProperty('error_type')) {
    throwHiddenError('Object has no error_type', { 'function': 'parse-errors' });
    return [];
  }

  if (!errorTypeMap.hasOwnProperty(error.error_type)) {
    logError(new Error(`Invalid error type ${error.error_type}`));
    return [];
  }

  return errorTypeMap[error.error_type](error);
};
