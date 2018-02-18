/*eslint-env browser, jest*/
/*eslint-disable react/prefer-stateless-function*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';



//NOTE: Mocked cuz cant get addEventListener from dropzone lib
const DropZone = class DropZone extends Component {
  render () {
    const { children } = this.props;

    return (
      <div className="DropZone">{children}</div>
    );
  }
};


DropZone.propTypes = {
  children: PropTypes.any
};

export default DropZone;
