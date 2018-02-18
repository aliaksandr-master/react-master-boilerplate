/* eslint-env jest */
import assertIsString from '../assert-is-string';



describe('assertIsString', () => {
  it('should throws', () => {
    expect(() => {
      assertIsString('some', 123);
    }).toThrow();
    expect(() => {
      assertIsString('some', NaN);
    }).toThrow();
    expect(() => {
      assertIsString('some', {});
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsString('some', '123');
      assertIsString('some', 'asdasdaweqwe');
    }).not.toThrow();
  });
});
