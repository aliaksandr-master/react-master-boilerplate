import isPlainObject from 'lodash/isPlainObject';
import typeOf from '../lib/type-of';



export default (name, value) => {
  if (!isPlainObject(value)) {
    throw new TypeError(`${name} must be plain object, "${typeOf(value)}" given`);
  }
};
