/* eslint-env browser, jest */

import isNumber from 'lodash/isNumber';
import deepFilter from '../deep-filter';



describe('deepFilter', () => {
  it('should filter', () => {
    expect(deepFilter((value, key) => !key || isNumber(value))({ a: 1, b: true })).toEqual({ a: 1 });
  });
});
