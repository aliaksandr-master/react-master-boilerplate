/* eslint-env jest */
import assertVariants from '../assert-variants';



describe('assertNumberGTE0', () => {
  it('should throws', () => {
    expect(() => {
      assertVariants([ '123', 123 ], 'some1', 345);
    }).toThrow();
    expect(() => {
      assertVariants([ '123', 123 ], 'some1', '345');
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertVariants([ '123', 123 ], 'some1', '123');
    }).not.toThrow();
    expect(() => {
      assertVariants([ '123', 123 ], 'some1', 123);
    }).not.toThrow();
  });
});
