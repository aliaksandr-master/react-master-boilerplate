/* eslint-disable react/display-name, react/jsx-no-bind, react/prop-types */

import React from 'react';
import Article from './index';



export default {
  default: {
    testing: true,
    props: {
    },
    handlers: {
    },
    wrapperState: {
    },
    wrapperHandlers: {
    },
    template: (props, wrapperState) => (
      <div>
        <Article {...props} >
          <h1>Lorem Ipsum</h1>
          <p>
            Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
          </p>
          <p>
            Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
          </p>
        </Article>
      </div>
    )
  }
};
