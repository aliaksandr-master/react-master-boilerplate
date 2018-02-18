/* eslint-env jest */

import route from '../index';



describe('route app.dashboard', () => {
  it('attach', () => {
    expect(route).toMatchSnapshot();
  });
});
