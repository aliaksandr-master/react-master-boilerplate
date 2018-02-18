/* eslint-env browser, jest */

import numberLessOrEqualThan from '../number-lte';



const message = 'invalid';

describe('number-lte', () => {
  it('it should pass min number', () => {
    expect(numberLessOrEqualThan(20)(15)).toBe(undefined);
    expect(numberLessOrEqualThan(20, message)(-20)).toBe(undefined);
    expect(numberLessOrEqualThan(20, message)(20)).toBe(undefined);
    expect(numberLessOrEqualThan(20, message)(0)).toBe(undefined);
  });
  it('it should some number', () => {
    expect(numberLessOrEqualThan(20, message)()).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(numberLessOrEqualThan(20, message)(NaN)).toBe('invalid number format');
    expect(numberLessOrEqualThan(20, message)('string')).toBe('invalid number format');
    expect(numberLessOrEqualThan(20, message)(25)).toBe(message);
    expect(numberLessOrEqualThan(20, message)('$25')).toBe('invalid number format');
    expect(numberLessOrEqualThan(20, message)('$15')).toBe('invalid number format');
    expect(numberLessOrEqualThan(20, message)('$$25')).toBe('invalid number format');
  });
});
