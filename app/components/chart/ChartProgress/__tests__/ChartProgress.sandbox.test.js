/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandbox from '../ChartProgress.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandbox).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const FieldAddKeywordsSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <FieldAddKeywordsSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
