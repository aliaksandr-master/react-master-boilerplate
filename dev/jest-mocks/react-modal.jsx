/*eslint-env browser, jest*/

import React from 'react';
import PropTypes from 'prop-types';



const ReactModal = ({ children, ...otherProps }) => (
  <div>
    <h1>REACT_MODAL</h1>
    <p>{JSON.stringify(otherProps, null, 4)}</p>
    <div>{children}</div>
  </div>
);

ReactModal.propTypes = {
  children: PropTypes.any
};

export default ReactModal;
