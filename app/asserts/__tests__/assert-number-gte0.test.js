/* eslint-env jest */
import assertNumberGTE0 from '../assert-number-gte0';



describe('assertNumberGTE0', () => {
  it('should throws', () => {
    expect(() => {
      assertNumberGTE0('some', -123);
    }).toThrow();
    expect(() => {
      assertNumberGTE0('some', NaN);
    }).toThrow();
    expect(() => {
      assertNumberGTE0('some', {});
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertNumberGTE0('some', 123);
      assertNumberGTE0('some', 0);
      assertNumberGTE0('some', 1);
    }).not.toThrow();
  });
});
