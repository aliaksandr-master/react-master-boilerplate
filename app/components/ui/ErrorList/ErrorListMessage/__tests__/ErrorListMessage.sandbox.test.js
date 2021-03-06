/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../../vendor/react-sandbox/sandbox-staging';
import sandboxErrorListMessage from '../ErrorListMessage.sandbox';
import Test from '../../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxErrorListMessage).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const ErrorListMessageSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <ErrorListMessageSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
