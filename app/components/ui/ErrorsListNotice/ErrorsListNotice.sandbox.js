/* eslint-disable react/display-name, react/jsx-no-bind, react/prop-types */

import React from 'react';
import ErrorsListNotice from './index';



export default {
  default: {
    testing: true,
    props: {
      messages: [
        'hello!'
      ]
    },
    handlers: {},
    wrapperState: {},
    wrapperHandlers: {},
    template: (props, wrapperState) => (
      <div>
        <ErrorsListNotice
          {...props}
        />
      </div>
    )
  }
};
