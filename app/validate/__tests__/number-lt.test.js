/* eslint-env browser, jest */

import numberLessThan from '../number-lt';



const message = 'invalid';

describe('number-lt', () => {
  it('it should pass min number', () => {
    expect(numberLessThan(20)(15)).toBe(undefined);
    expect(numberLessThan(20, message)(-20)).toBe(undefined);
    expect(numberLessThan(20, message)(0)).toBe(undefined);
  });
  it('it should some number', () => {
    expect(numberLessThan(20, message)()).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(numberLessThan(20, message)(20)).toBe(message);
    expect(numberLessThan(20, message)(25)).toBe(message);
    expect(numberLessThan(20, message)('string')).toBe('invalid number format');
    expect(numberLessThan(20, message)(NaN)).toBe('invalid number format');
    expect(numberLessThan(20, message)('$20')).toBe('invalid number format');
  });
});
