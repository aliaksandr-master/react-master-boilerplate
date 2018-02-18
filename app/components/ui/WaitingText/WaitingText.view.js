import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import classnames from '../../../vendor/classnames';
import { THEME } from './WaitingText.const';
import './WaitingText.view.less';



const themesMap = {
  [THEME.DEFAULT]: 'WaitingText--themeDefault',
  [THEME.BLOCK]: 'WaitingText--themeBlock'
};



const WaitingText = ({ children, className, theme, height }) => {
  return (
    <span className={classnames('WaitingText', themesMap[theme], className)} style={{ height }}>
      <span className="WaitingText__in">
        <span className="WaitingText__text">{children}</span>
        <span className="WaitingText__dot" />
        <span className="WaitingText__dot" />
        <span className="WaitingText__dot" />
      </span>
    </span>
  );
};



WaitingText.propTypes = {
  height: PropTypes.number,
  theme: PropTypes.oneOf(values(THEME)),
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};



WaitingText.defaultProps = {
  children: 'Loading'
};



export default WaitingText;
