/* eslint-env jest */
import assertBoolean from '../assert-is-boolean';



describe('assertBoolean', () => {
  it('should throws', () => {
    expect(() => {
      assertBoolean('some', 1);
      assertBoolean('some', 'some');
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertBoolean('some', true);
    }).not.toThrow();
  });
});
