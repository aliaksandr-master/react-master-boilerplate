/* eslint-env jest */
import assertVariants from '../assert-variants';



describe('assertVariants', () => {
  it('should throws', () => {
    expect(() => {
      assertVariants([], 'some', 1);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertVariants([ 1 ], 'some', 1);
    }).not.toThrow();
  });
});
