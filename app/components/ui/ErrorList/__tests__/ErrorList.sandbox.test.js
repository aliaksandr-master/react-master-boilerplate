/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxErrorList from '../ErrorList.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxErrorList).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const ErrorListSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <ErrorListSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
