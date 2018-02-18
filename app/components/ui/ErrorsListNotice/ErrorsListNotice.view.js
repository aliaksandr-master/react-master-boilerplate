/* eslint-disable react/no-array-index-key*/
import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import isString from 'lodash/isString';
import { mapStr } from 'str-map';
import classnames from '../../../vendor/classnames';
import { THEME, SIZE } from './ErrorsListNotice.const';
import './ErrorsListNotice.view.less';



const themesMap = {
  [THEME.DEFAULT]: 'ErrorsListNotice--themeDefault'
};

const sizesMap = {
  [SIZE.DEFAULT]: 'ErrorsListNotice--sizeDefault'
};



const ErrorsListNotice = ({ messages, translationKey, theme, size, className }) => {
  if (!messages || !messages.length) {
    return (
      <noscript />
    );
  }

  if (!Array.isArray(messages)) {
    messages = [ messages ];
  }

  return (
    <div className={classnames('ErrorsListNotice', className, themesMap[theme], sizesMap[size])}>
      {messages.map((message, index) => (
        <div key={index} className="ErrorsListNotice__item">
          {translationKey
            ? (
              mapStr(translationKey, isString(message) ? message : (message.text || message.message || message.label))
            ) : (
              isString(message) ? message : (message.text || message.message || message.label)
            )
          }
        </div>
      ))}
    </div>
  );
};



ErrorsListNotice.propTypes = {
  className: PropTypes.string,
  translationKey: PropTypes.string,
  size: PropTypes.oneOf(values(SIZE)),
  theme: PropTypes.oneOf(values(THEME)),
  messages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string, // OR
      label: PropTypes.string, // OR
      text: PropTypes.string // OR
    }))
  ])
};



ErrorsListNotice.defaultProps = {
  size: SIZE.DEFAULT,
  theme: THEME.DEFAULT
};



export default ErrorsListNotice;
