/* eslint-env jest */
import assertDiff from '../assert-diff';



describe('assertBoolean', () => {
  it('should throws', () => {
    expect(() => {
      assertDiff('some', [ 1, 2, 3 ], [ 0, 3, 4, 5 ]);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertDiff('some', [ 1, 2, 3 ], [ 1, 2, 3 ]);
    }).not.toThrow();
  });
});
