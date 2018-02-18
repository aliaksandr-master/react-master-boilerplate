/* eslint-env jest */
import assertIsNumberable from '../assert-is-numerable';



describe('assertBoolean', () => {
  it('should throws', () => {
    expect(() => {
      assertIsNumberable('some', 'asd');
    }).toThrow();
    expect(() => {
      assertIsNumberable('some', NaN);
    }).toThrow();
    expect(() => {
      assertIsNumberable('some', {});
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsNumberable('some', '123');
      assertIsNumberable('some', 123);
    }).not.toThrow();
  });
});
