/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxErrorsListNotice from '../ErrorsListNotice.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxErrorsListNotice).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const ErrorsListNoticeSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <ErrorsListNoticeSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
