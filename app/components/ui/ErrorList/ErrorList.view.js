/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../../vendor/classnames';
import errorPropType from '../../../prop-types/error';
import { ERROR_TYPE } from '../../../config/constants';
import { THEME, SIZE, DEFAULT_ERROR } from './ErrorList.const';
import ErrorListValidation from './ErrorListValidation';
import ErrorListMessage from './ErrorListMessage';
import './ErrorList.view.less';



const themesMap = {
  [THEME.DEFAULT]: 'ErrorList--themeDefault'
};

const sizesMap = {
  [SIZE.DEFAULT]: 'ErrorList--sizeDefault'
};

export const ERROR_TYPE_MAP = {
  [ERROR_TYPE.VALIDATION]: ErrorListValidation
};

const ErrorList = ({
  theme,
  size,
  className,
  limit,
  errors,
  typesMap,
  defaultErrorComponent,
  ...innerViewProps
}) => {
  if (!errors || !errors.length) {
    return (
      <noscript />
    );
  }

  const errorsData = errors.slice(0, limit).filter((error) => typesMap[error.type]);

  if (!errorsData.length && errors.length) {
    if (!defaultErrorComponent) {
      return (
        <noscript />
      );
    }

    const DefaultErrorComponent = defaultErrorComponent;

    return (
      <div className={classnames('ErrorList', className, themesMap[theme], sizesMap[size])}>
        <DefaultErrorComponent
          {...innerViewProps}
          error={DEFAULT_ERROR}
        />
      </div>
    );
  }

  return (
    <div className={classnames('ErrorList', className, themesMap[theme], sizesMap[size])}>
      {errorsData.map((error, index) => {
        const Component = typesMap[error.type];

        return (<Component {...innerViewProps} error={error} key={index} />);
      })}
    </div>
  );
};



ErrorList.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZE)),
  theme: PropTypes.oneOf(Object.values(THEME)),
  errors: PropTypes.arrayOf(errorPropType),
  fieldTitleMap: PropTypes.objectOf(PropTypes.string),
  limit: PropTypes.number,
  defaultErrorComponent: PropTypes.func,
  typesMap: PropTypes.objectOf(PropTypes.func)
};



ErrorList.defaultProps = {
  size: SIZE.DEFAULT,
  theme: THEME.DEFAULT,
  limit: 10,
  defaultErrorComponent: ErrorListMessage,
  typesMap: ERROR_TYPE_MAP
};



export default ErrorList;
