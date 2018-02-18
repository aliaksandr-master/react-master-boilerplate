/* eslint-env jest */
import assertPlainObject from '../assert-is-plain-object';



describe('assertPlainObject', () => {
  it('should throws', () => {
    expect(() => {
      assertPlainObject('some', 123);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertPlainObject('some', {});
    }).not.toThrow();
  });
});
