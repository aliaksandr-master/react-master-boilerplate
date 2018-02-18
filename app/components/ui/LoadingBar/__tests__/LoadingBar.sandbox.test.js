/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxLoadingBar from '../LoadingBar.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxLoadingBar).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const LoadingBarSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <LoadingBarSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
