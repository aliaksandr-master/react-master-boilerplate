/* eslint-env browser, jest */

import email from '../email';



describe('email', () => {
  it('it should pass min length', () => {
    expect(email()('some@email.com')).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(email()('some@email')).toBe('Invalid email format');
  });
});
