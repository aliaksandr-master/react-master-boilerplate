/* eslint-env jest */
import assertRedundantProps from '../assert-redundant-props';



describe('assertNumberGTE0', () => {
  it('should throws', () => {
    expect(() => {
      assertRedundantProps('some1', null, { a: 123, b: 'asd' });
    }).toThrow();
    expect(() => {
      assertRedundantProps('some2', null, [ 1, 2, 3 ]);
    }).toThrow();
    expect(() => {
      assertRedundantProps('some3', {});
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertRedundantProps('some4', null, {});
    }).not.toThrow();
    expect(() => {
      assertRedundantProps('some4', (v, k) => !/^_/.test(k), { _a: 123 });
    }).not.toThrow();
  });
});
