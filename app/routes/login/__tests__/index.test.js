/* eslint-env jest */

import route from '../index';



describe('route home', () => {
  it('attach', () => {
    expect(route).toMatchSnapshot();
  });
});
