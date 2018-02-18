/* eslint-env jest */
import assertIsArray from '../assert-is-array';



describe('assertArray', () => {
  it('should throws', () => {
    expect(() => {
      assertIsArray('some', 123);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsArray('some', []);
    }).not.toThrow();
  });
});
