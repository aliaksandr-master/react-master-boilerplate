/* eslint-env browser, jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Root from '../index';
import Test from '../../../test/Test';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        {() => (
          <Root />
        )}
      </Test>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
