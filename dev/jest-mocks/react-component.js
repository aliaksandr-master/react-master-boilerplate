/*eslint-env browser, jest*/

import PropTypes from 'prop-types';
import React from 'react';



const SomeComponent = ({ children, ...props }) => (
  <div>
    <pre>{JSON.stringify(props)}</pre>
    <div>{children}</div>
  </div>
);

SomeComponent.propTypes = {
  children: PropTypes.node
};

export default SomeComponent;
