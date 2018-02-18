import isString from 'lodash/isString';
import memo from 'lodash/memoize';
import isNaN from 'lodash/isNaN';
import assertIsString from '../asserts/assert-is-string';



export default memo((message = 'Required') => {
  if (__ASSERTS_ENABLED__) {
    assertIsString('validator message', message);
  }

  return (value) => {
    if (value == null) {
      return message;
    }

    if ((isString(value) && !value.length) || isNaN(value)) {
      return message;
    }

    return undefined;
  };
}, (message) => String(message));
