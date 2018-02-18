/* eslint-disable react/display-name, react/jsx-no-bind, react/prop-types */
import React from 'react';
import { DEFAULT_ERROR } from '../ErrorList.const';
import ErrorListMessage from './index';



export default {
  default: {
    testing: true,
    props: {
      error: DEFAULT_ERROR
    },
    handlers: {
    },
    wrapperState: {
    },
    wrapperHandlers: {
    },
    template: (props) => (
      <div>
        <ErrorListMessage
          {...props}
        />
      </div>
    )
  }
};
