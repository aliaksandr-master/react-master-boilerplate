/* eslint-env browser, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import renderer from 'react-test-renderer';
import ErrorListValidation from '../index';
import Test from '../../../../test/Test';



describe('rendering', () => {
  it('should render something', () => {
    const component = renderer.create(
      <Test>
        <ErrorListValidation
          error={{
            message: 'ipsum',
            typed_params: {
              field_name: 'lorem'
            }
          }}
          fieldTitleMap={{}}
        />
      </Test>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
