/* eslint-disable react/display-name, react/jsx-no-bind, react/prop-types */

import React from 'react';
import PageRegister from './index';



export default {
  default: {
    testing: true,
    props: {
      // some default props
    },
    handlers: {
      //someHandlerName: (props, wrapperState, { setProps, setState }) => (...someArguments) => {
      //  // do something useful
      //}
    },
    wrapperState: {
    },
    wrapperHandlers: {
      //someHandlerName: (props, wrapperState, { setProps, setState }) => (...someArguments) => {
      //  // do something useful
      //}
    },
    template: (props, wrapperState) => (
      <div>
        <PageRegister
          {...props}
        />
      </div>
    )
  }
};
