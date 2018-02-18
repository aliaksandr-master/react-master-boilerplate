/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import <%= name %> from '../index';
import Test from '<%= _relPath("app/components/test/Test") %>';



describe('<%= name %> rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        <<%= name %><% if (type.modal) { %> isOpen onCloseRequest={() => {}}<% } %> />
      </Test>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
