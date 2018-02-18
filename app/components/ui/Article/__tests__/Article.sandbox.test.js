/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import { wrapSandbox } from '../../../../vendor/react-sandbox/sandbox-staging';
import sandboxArticle from '../Article.sandbox';
import Test from '../../../test/Test';



describe('rendering', () => {
  wrapSandbox(sandboxArticle).forEach(({ name, template, props }) => {
    it(`should render sandbox "${name}"`, () => {
      const ArticleSandboxComponent = template();

      const component = renderer.create(
        <Test>
          <ArticleSandboxComponent {...props} />
        </Test>
      );

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
