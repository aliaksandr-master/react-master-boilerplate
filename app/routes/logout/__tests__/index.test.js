/* eslint-env jest */

import route from '../index';



describe('route logout', () => {
  it('attach', () => {
    expect(route).toMatchSnapshot();
  });
});
