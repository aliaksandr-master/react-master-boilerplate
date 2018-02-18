/* eslint-disable react/display-name */

import React from 'react';
import getStaticUrl from '../../../lib/calc-static-url';
import TEST_IMAGE from '../../../images/favicon/apple-icon-precomposed.png';
import Image from './index';



export default {
  default: {
    props: {},
    template: (props) => (
      <div>
        <Image
          {...props}
          src={getStaticUrl(TEST_IMAGE)}
        />
      </div>
    )
  },
  image_static: {
    props: {},
    template: (props) => (
      <div>
        <Image
          static
          {...props}
          src={TEST_IMAGE}
        />
      </div>
    )
  }
};
