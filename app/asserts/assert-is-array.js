import isArray from 'lodash/isArray';
import typeOf from '../lib/type-of';



export default (name, value) => {
  if (!isArray(value)) {
    throw new TypeError(`${name} must be array, "${typeOf(value)}" given`);
  }
};
