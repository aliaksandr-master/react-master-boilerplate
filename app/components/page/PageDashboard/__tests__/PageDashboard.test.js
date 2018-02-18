/* eslint-env browser, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import PageDashboard from '../index';
import Test from '../../../test/Test';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        {() => <PageDashboard />}
      </Test>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
