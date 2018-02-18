/* eslint-env browser, jest */


import React from 'react';
import renderer from 'react-test-renderer';
import PageLogIn from '../PageLogIn';
import Test from '../../../test/Test';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        <PageLogIn redirectToRoot={false} />
      </Test>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
