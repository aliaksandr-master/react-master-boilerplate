import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import classnames from '../../../../vendor/classnames';
import errorPropType from '../../../../prop-types/error';
import './ErrorListValidation.view.less';



const ErrorListValidation = ({ error: { message, typed_params: { field_name } }, fieldTitleMap, className }) => {
  const displayFieldName = fieldTitleMap && fieldTitleMap.hasOwnProperty(field_name) ? (fieldTitleMap[field_name] || '') : capitalize(String(field_name).replace('_', ' '));

  return (<div className={classnames('ErrorListValidation', className)}>{`${displayFieldName} : ${message}`}</div>);
};



ErrorListValidation.propTypes = {
  className: PropTypes.string,
  error: errorPropType.isRequired,
  fieldTitleMap: PropTypes.objectOf(PropTypes.string)
};



ErrorListValidation.defaultProps = {
};



export default ErrorListValidation;
