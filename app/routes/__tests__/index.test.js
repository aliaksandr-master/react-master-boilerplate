/* eslint-env browser, jest */

import routesTree from '../index';



describe('routes', () => {
  it('should require without errors', () => {
    expect(routesTree.getRoutes()).toMatchSnapshot();
  });
});
