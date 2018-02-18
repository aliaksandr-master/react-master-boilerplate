/* eslint-env browser, jest */

import pattern from '../pattern';



describe('pattern', () => {
  it('should pass non string value', () => {
    expect(pattern(/^\d+$/, 'Must be number')(300000004670450674)).toBe(undefined);
  });
  it('should return error message', () => {
    expect(pattern(/^\d+$/, 'Must be number')('Lorem ipsum dolor sir omet')).toBe('Must be number');
  });
  it('should set default minCount', () => {
    expect(pattern(/^\d+$/, 'Must be number')('Lorem ipsum dolor sir omet')).toBe('Must be number');
  });
  it('should pass with null value', () => {
    expect(pattern(/^\d+$/, 'Must be number')(null)).toBe(undefined);
  });
  it('should throw error if config is invalid', () => {
    expect(() => {
      pattern();
    }).toThrow();
  });
});
