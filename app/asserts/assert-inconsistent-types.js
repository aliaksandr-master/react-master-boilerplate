import forEach from 'lodash/forEach';
import isNil from 'lodash/isNil';
import typeOf from '../lib/type-of';



export default (name, ideal, value) => {
  forEach(ideal, (v, k) => {
    if (isNil(v) || isNil(value[k]) || typeOf(v) === typeOf(value[k])) {
      return;
    }

    throw new TypeError(`${name} has inconsistent types`);
  });
};
