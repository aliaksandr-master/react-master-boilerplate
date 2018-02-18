import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../../../vendor/classnames';
import errorPropType from '../../../../prop-types/error';
import './ErrorListMessage.view.less';



const ErrorListMessage = ({ error: { message }, className }) => {
  return (
    <div className={classnames('ErrorListMessage', className)}>
      {message}
    </div>
  );
};



ErrorListMessage.propTypes = {
  className: PropTypes.string,
  error: errorPropType.isRequired
};



ErrorListMessage.defaultProps = {
};



export default ErrorListMessage;
