/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxTrackerIcon from '../WaitingText.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxTrackerIcon).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const TrackerIconSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <TrackerIconSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
