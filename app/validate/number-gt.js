import assertIsNumber from '../asserts/assert-is-number';
import isNumerable from '../lib/isNumerable';



export default (min, message = `Must be greater than ${min}`) => {
  if (__ASSERTS_ENABLED__) {
    assertIsNumber('min', min);
  }

  return (value) => {
    if (value == null) {
      return undefined; // required support
    }

    if (!isNumerable(value)) {
      return 'invalid number format';
    }

    return Number(value) > min ? undefined : message;
  };
};
