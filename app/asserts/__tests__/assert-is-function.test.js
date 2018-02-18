/* eslint-env jest */
import assertIsFunction from '../assert-is-function';



describe('assertFunction', () => {
  it('should throws', () => {
    expect(() => {
      assertIsFunction('some', {});
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertIsFunction('some', () => {});
    }).not.toThrow();
  });
});
