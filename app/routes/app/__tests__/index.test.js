/* eslint-env jest */

import route from '../index';



describe('route app', () => {
  it('attach', () => {
    expect(route).toMatchSnapshot();
  });
});
