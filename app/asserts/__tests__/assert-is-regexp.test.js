/* eslint-env jest */
import assertIsRegexp from '../assert-is-regexp';



describe('assertBoolean', () => {
  it('should throws', () => {
    expect(() => {
      assertIsRegexp('some', 1);
    }).toThrow();
    expect(() => {
      assertIsRegexp('some', 'some');
    }).toThrow();
    expect(() => {
      assertIsRegexp('some', NaN);
    }).toThrow();
    expect(() => {
      assertIsRegexp('some', {});
    }).toThrow();
    expect(() => {
      assertIsRegexp('some', []);
    }).toThrow();
    expect(() => {
      assertIsRegexp('some', true);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsRegexp('some', new RegExp('/some/'));
      assertIsRegexp('some', /some/);
    }).not.toThrow();
  });
});
