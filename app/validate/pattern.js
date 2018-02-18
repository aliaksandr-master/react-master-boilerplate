import isRegExp from 'lodash/isRegExp';
import { throwHiddenError } from '../lib/log';



export default (regExp, message = 'invalid format') => {
  if (!isRegExp(regExp)) {
    throwHiddenError('object must be valid regexp');

    return () => undefined;
  }

  return (value) => {
    value = String(value == null ? '' : value);

    return value.length && !regExp.test(value) ? message : undefined;
  };
};
