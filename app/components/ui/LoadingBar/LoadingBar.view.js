import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import './LoadingBar.view.less';



const style = {
  bar: {
    position: 'fixed',
    display: 'none',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    zIndex: 9999,
    boxShadow: '0 0 3px rgba(0,0,0,0.25)'
  },
  barActive: {
    position: 'fixed',
    display: 'block',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    zIndex: 9999,
    boxShadow: '0 0 3px rgba(0,0,0,0.25)'
  }
};


const LoadingBar = ({ active }) => (
  <LinearProgress style={active.length ? style.barActive : style.bar} mode="indeterminate" />
);



LoadingBar.propTypes = {
  active: PropTypes.array.isRequired
};



LoadingBar.defaultProps = {
};



export default LoadingBar;
