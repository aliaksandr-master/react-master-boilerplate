/* eslint-env browser, jest */

import numberGreaterThan from '../number-gt';



const message = 'invalid';

describe('numberGreaterThan', () => {
  it('it should pass max number', () => {
    expect(numberGreaterThan(20)(25)).toBe(undefined);
  });
  it('it should some number', () => {
    expect(numberGreaterThan(20, message)()).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(numberGreaterThan(20, message)(15)).toBe(message);
    expect(numberGreaterThan(20, message)(0)).toBe(message);
    expect(numberGreaterThan(20, message)(-20)).toBe(message);
    expect(numberGreaterThan(20, message)(20)).toBe(message);
    expect(numberGreaterThan(20, message)(NaN)).toBe('invalid number format');
    expect(numberGreaterThan(20, message)('string')).toBe('invalid number format');
  });
});
