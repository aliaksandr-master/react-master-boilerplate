/* eslint-env browser, jest */

import maxLength from '../max-length';



describe('maxLength', () => {
  it('it should pass max length', () => {
    expect(maxLength(6)('Lorem')).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(maxLength(5)('Lorem ipsum dolor')).toBe('Must be 5 characters or less');
  });
});
