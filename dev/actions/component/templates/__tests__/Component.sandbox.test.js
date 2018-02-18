/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '<%= _relPath("app/vendor/react-sandbox/sandbox-staging") %>';
import sandbox<%= name %> from '../<%= name %>.sandbox';
import Test from '<%= _relPath("app/components/test/Test") %>';



describe('rendering', () => {
  wrapSandbox(sandbox<%= name %>).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const <%= name %>SandboxComponent = template();

      const component = renderer.create(
        <Test>
          <<%= name %>SandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
