import assertIsNumber from '../asserts/assert-is-number';
import isNumerable from '../lib/isNumerable';



export default (max, message = `Must be less or equal than ${max}`) => {
  if (__ASSERTS_ENABLED__) {
    assertIsNumber('max', max);
  }

  return (value) => {
    if (value == null) {
      return undefined; // required support
    }

    if (!isNumerable(value)) {
      return 'invalid number format';
    }

    return Number(value) <= max ? undefined : message;
  };
};
