/* eslint-env browser, jest */

import required from '../required';



describe('required', () => {
  it('should pass required string', () => {
    expect(required()('Lorem ipsum')).toBe(undefined);
  });
  it('should pass required number', () => {
    expect(required()(12345)).toBe(undefined);
  });
  it('should show error message', () => {
    expect(required()()).toBe('Required');
    expect(required()('')).toBe('Required');
    expect(required()(NaN)).toBe('Required');
  });
});
