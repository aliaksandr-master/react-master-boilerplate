/* eslint-env browser, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Root from '../index';
import Test from '../../../test/Test';
import routesTree from '../../../../routes/index';
import history from '../../../../lib/history';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        <Root routes={routesTree.getRoutes()} history={history} />
      </Test>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
