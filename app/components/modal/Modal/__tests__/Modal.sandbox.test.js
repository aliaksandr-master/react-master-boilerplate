/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxModal from '../Modal.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxModal).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const Modal = template();

      const component = renderer.create(
        <Test>
          <Modal {...props} />
        </Test>
      );

      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
