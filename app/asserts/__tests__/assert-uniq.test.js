/* eslint-env jest */
import assertUniq from '../assert-uniq';



describe('assertUniq', () => {
  it('should throws', () => {
    expect(() => {
      assertUniq('some', [ 1, 2, 3, 1 ]);
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertUniq('some', [ 1, 2, 3 ]);
    }).not.toThrow();
  });
});
