import isFunction from 'lodash/isFunction';
import assertIsFunction from '../asserts/assert-is-function';



const identity = (value) => value;

export default (...filters) => {
  filters = filters.filter((filter, index) => {
    if (filter == null) {
      return false;
    }

    if (__ASSERTS_ENABLED__) {
      assertIsFunction(`filter[${index}]`, filter);
    }

    return isFunction(filter);
  });

  if (!filters.length) {
    return identity;
  }

  if (filters.length === 1) {
    return filters[0];
  }

  return (value) => filters.reduce((value, filter) => filter(value), value);
};
