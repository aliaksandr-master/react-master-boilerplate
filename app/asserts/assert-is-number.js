import isNumber from 'lodash/isNumber';
import typeOf from '../lib/type-of';



export default (name, value) => {
  if (!isNumber(value) || isNaN(value)) {
    throw new TypeError(`${name} must be number. "${typeOf(value)}" given`);
  }
};
