/* eslint-disable react/display-name */

import React from 'react';
import ChartProgress from './index';



export default {
  default: {
    props: {
      value: 0.2,
      height: 12,
      background: 'red'
    },
    template: (props) => (
      <ChartProgress {...props} />
    )
  },
  over: {
    props: {
      value: 13,
      height: 12,
      background: 'red'
    },
    template: (props) => (
      <ChartProgress {...props} />
    )
  }
};
