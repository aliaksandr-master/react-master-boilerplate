/* eslint-env browser, jest */


import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxImage from '../Image.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxImage).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const Image = template();
      const component = renderer.create(
        <Test>
          <Image {...props} />
        </Test>
      );

      const tree = component.toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
