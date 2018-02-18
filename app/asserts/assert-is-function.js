import isFunction from 'lodash/isFunction';
import typeOf from '../lib/type-of';



export default (name, value) => {
  if (!isFunction(value)) {
    throw new TypeError(`${name} must be function, "${typeOf(value)}" given`);
  }
};
