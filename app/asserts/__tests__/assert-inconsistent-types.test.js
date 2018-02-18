/* eslint-env jest */
import assertInconsistentTypes from '../assert-inconsistent-types';



describe('assertBoolean', () => {
  it('should throws', () => {
    expect(() => {
      assertInconsistentTypes('some', { a: 123 }, { a: 'asd' });
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertInconsistentTypes('some', { a: 123 }, { a: 234 });
    }).not.toThrow();
  });
});
