/* eslint-env browser, jest */

import composeValidators from '../compose-validators';
import minLength from '../min-length';



describe('compose-validators', () => {
  it('it should pass max length', () => {
    expect(composeValidators(minLength(3))('Lorem')).toBe(undefined);
  });
  it('it should show error message', () => {
    expect(composeValidators(minLength(3))('22')).toBe('Must be at least 3 characters');
  });
});
