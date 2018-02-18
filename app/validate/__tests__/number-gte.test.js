/* eslint-env browser, jest */

import numberGreaterOrEqualThan from '../number-gte';



const message = 'invalid';

describe('numberGreaterOrEqualThan', () => {
  it('it should pass max number', () => {
    expect(numberGreaterOrEqualThan(20)(20)).toBe(undefined);
    expect(numberGreaterOrEqualThan(20, message)(25)).toBe(undefined);
  });
  it('it should some number', () => {
    expect(numberGreaterOrEqualThan(20, message)()).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(numberGreaterOrEqualThan(20, message)(15)).toBe(message);
    expect(numberGreaterOrEqualThan(20, message)('string')).toBe('invalid number format');
    expect(numberGreaterOrEqualThan(20, message)(NaN)).toBe('invalid number format');
    expect(numberGreaterOrEqualThan(20, message)(0)).toBe(message);
    expect(numberGreaterOrEqualThan(20, message)(-20)).toBe(message);
    expect(numberGreaterOrEqualThan(20, message)('$25')).toBe('invalid number format');
    expect(numberGreaterOrEqualThan(20, message)('$15')).toBe('invalid number format');
  });
});
