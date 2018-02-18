/* eslint-env browser, jest */


import React from 'react';
import renderer from 'react-test-renderer';
import PageLogOut from '../PageLogOut';
import Test from '../../../test/Test';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        <PageLogOut redirectToRoot={false} />
      </Test>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
