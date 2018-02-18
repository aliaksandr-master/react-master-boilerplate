/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxPageRegister from '../PageRegister.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxPageRegister).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const PageRegisterSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <PageRegisterSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
