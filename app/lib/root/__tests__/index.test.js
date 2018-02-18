/* eslint-env browser, jest */

import root from '../index';



describe('root', () => {
  it('it should be dom element', () => {
    expect(root.id).toBe('react-root');
  });
});
