/* eslint-disable react/display-name, react/jsx-no-bind, react/prop-types */

import React from 'react';
import { ERROR_TYPE } from '../../../config/constants';
import ErrorList from './index';



export default {
  default: {
    testing: true,
    props: {
      fieldTitleMap: {
        'some': 'Hello World'
      },
      errors: [
        {
          message: 'First Error!',
          type: ERROR_TYPE.VALIDATION,
          typed_params: {
            field_name: 'some'
          }
        },
        {
          message: 'Error 2!',
          type: ERROR_TYPE.VALIDATION,
          typed_params: {
            field_name: 'foo'
          }
        }
      ]
    },
    handlers: {},
    wrapperState: {},
    wrapperHandlers: {},
    template: (props, wrapperState) => (
      <div>
        <ErrorList
          {...props}
        />
      </div>
    )
  }
};
