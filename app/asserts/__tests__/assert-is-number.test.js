/* eslint-env jest */
import assertIsNumber from '../assert-is-number';



describe('assertIsNumber', () => {
  it('should throws', () => {
    expect(() => {
      assertIsNumber('some', 'asd');
    }).toThrow();
    expect(() => {
      assertIsNumber('some', NaN);
    }).toThrow();
    expect(() => {
      assertIsNumber('some', NaN);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsNumber('some', 123);
      assertIsNumber('some', 123.123);
    }).not.toThrow();
  });
});
