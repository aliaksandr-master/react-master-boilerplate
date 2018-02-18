/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxPageNotFound from '../PageNotFound.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxPageNotFound).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const PageNotFoundSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <PageNotFoundSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
