/* eslint-env browser, jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxFieldInput from '../FieldInput.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxFieldInput).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const FieldInputSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <FieldInputSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
