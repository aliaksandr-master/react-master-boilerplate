import isString from 'lodash/isString';
import typeOf from '../lib/type-of';



export default (name, value) => {
  if (!value || !isString(value)) {
    throw new TypeError(`${name} must be non empty string, (${typeOf(value)}: ${JSON.stringify(value)}) given`);
  }

  if (value.trim() !== value) {
    throw new Error(`${name} was not trimmed, (${typeOf(value)}: ${JSON.stringify(value)}}) given`);
  }
};
