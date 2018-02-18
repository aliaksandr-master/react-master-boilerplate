import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../../vendor/classnames';
import './PageDashboard.view.less';



const PageDashboard = ({ className }) => {
  return (
    <div className={classnames('PageDashboard', className)}>
      Hello!
    </div>
  );
};



PageDashboard.propTypes = {
  className: PropTypes.string
};



PageDashboard.defaultProps = {
};



export default PageDashboard;
