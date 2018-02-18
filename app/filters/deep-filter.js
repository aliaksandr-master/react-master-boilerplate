import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';
import assertIsFunction from '../asserts/assert-is-function';



const deepFilter = (filter) => {
  assertIsFunction('filter', filter);

  const filterer = (value, key, host) => {
    if (!filter(value, key, host)) {
      return undefined;
    }

    const valueIsArray = isArray(value);

    if (!valueIsArray && !isPlainObject(value)) {
      return clone(value);
    }

    return reduce(value, (result, val, key) => {
      val = filterer(val, key, value);

      if (val === undefined) {
        return result;
      }

      if (valueIsArray) {
        return [ ...result, val ];
      }

      return { ...result, [key]: val };
    }, valueIsArray ? [] : {});
  };

  return (value) => filterer(value, null, null);
};

export default deepFilter;
