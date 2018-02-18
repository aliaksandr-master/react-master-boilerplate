/* eslint-disable react/display-name */

import React from 'react';
import { THEME } from './WaitingText.const';
import WaitingText from './index';



export default {
  default: {
    props: {},
    template: (props) => (<WaitingText {...props} />)
  },
  block: {
    props: {},
    template: (props) => (<WaitingText {...props} height={300} theme={THEME.BLOCK} />)
  }
};
