/* eslint-env browser, jest */

import minLength from '../min-length';



describe('minLength', () => {
  it('it should pass min length', () => {
    expect(minLength(5)('Lorem')).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(minLength(5)('Lor')).toBe('Must be at least 5 characters');
  });
});
