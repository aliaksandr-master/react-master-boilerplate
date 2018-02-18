/* eslint-env browser, jest */

import defaults from '../defaults';



describe('defaults', () => {
  it('should throw', () => {
    expect(() => {
      defaults(0, 123);
    }).toThrow();
  });
  it('should filter', () => {
    expect(defaults(0, false)(null)).toEqual(0);
    expect(defaults(333, false)(null)).toEqual(333);
    expect(defaults(0, false)(undefined)).toEqual(0);
    expect(defaults(333, false)(undefined)).toEqual(333);
    expect(defaults(0, true)(undefined)).toEqual(0);
    expect(defaults(333, true)(undefined)).toEqual(333);
    expect(defaults(0, true)(null)).toEqual(null);
    expect(defaults(333, true)(null)).toEqual(null);
    expect(defaults(0, false)(NaN)).toEqual(0);
    expect(defaults(333, false)(NaN)).toEqual(333);
    expect(defaults(0, true)(NaN)).toEqual(NaN);
    expect(defaults(333, true)(NaN)).toEqual(NaN);
    expect(defaults(333, true)(123)).toEqual(123);
    expect(defaults(333, false)(123)).toEqual(123);
  });
});
