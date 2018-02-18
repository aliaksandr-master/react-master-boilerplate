/* eslint-env jest */

import route from '../index';



describe('route register', () => {
  it('attach', () => {
    expect(route).toMatchSnapshot();
  });
});
