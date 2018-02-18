import uniq from 'lodash/uniq';
import difference from 'lodash/difference';
import assertIsArray from './assert-is-array';



export default (name, ideal, value) => {
  assertIsArray(name, value);
  assertIsArray(name, ideal);

  const uniqValues = uniq(value.concat(ideal));

  if (value.length !== uniqValues.length) {
    throw new Error(`${name} have difference between. [${uniq(difference(uniqValues, value).concat(difference(uniqValues, ideal)))}]`);
  }
};
