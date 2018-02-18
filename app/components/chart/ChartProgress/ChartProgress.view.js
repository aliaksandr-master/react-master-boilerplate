import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import classnames from '../../../vendor/classnames';
import { THEME } from './ChartProgress.const';
import './ChartProgress.view.less';



const themesMap = {
  [THEME.DEFAULT]: 'ChartProgress--themeDefault'
};



const ChartProgress = ({ className, theme, children, value, height, background, style }) => {
  if (value > 1) {
    value = 1;
  }

  if (!value || value < 0) {
    value = 0;
  }

  return (
    <div className={classnames('ChartProgress', className, themesMap[theme])}>
      <div className="ChartProgress__progress" style={{ background, height, width: `${value * 100}%`, ...style }}>{value}{children}</div>
    </div>
  );
};



ChartProgress.propTypes = {
  theme: PropTypes.oneOf(values(THEME)).isRequired,
  children: PropTypes.node,
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  background: PropTypes.string.isRequired,
  style: PropTypes.object //NOTE: object of styles
};



ChartProgress.defaultProps = {
  theme: THEME.DEFAULT,
  height: 10,
  value: 0,
  background: '#00ACCB',
  style: {}
};



export default ChartProgress;
