import uniq from 'lodash/uniq';
import assertIsArray from './assert-is-array';



export default (name, value) => {
  assertIsArray(name, value);

  if (value.length !== uniq(value).length) {
    throw new Error(`${name} has duplicate declarations. [${value.join(',')}] given`);
  }
};
