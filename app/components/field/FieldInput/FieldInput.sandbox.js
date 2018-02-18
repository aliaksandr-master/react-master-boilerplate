/* eslint-disable react/display-name, react/jsx-no-bind */
import React from 'react';
import FieldInput from './index';



export default {
  default: {
    props: {
      value: '123'
    },
    handlers: {
      onChange: (_1, _2, { setProps }) => (value) => {
        setProps({ value });
      }
    },
    template: (props) => (
      <div>
        <FieldInput {...props} />
      </div>
    )
  }
};
