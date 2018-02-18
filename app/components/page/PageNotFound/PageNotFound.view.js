import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-composite-router';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from '../../../vendor/classnames';
import './PageNotFound.view.less';



const PageNotFound = ({ className }) => {
  return (
    <div className={classnames('PageNotFound', className)}>
      <div className="PageNotFound__text">Page not found</div>
      <RaisedButton containerElement={<Link state="app" />}>Return</RaisedButton>
    </div>
  );
};



PageNotFound.propTypes = {
  className: PropTypes.string
};



PageNotFound.defaultProps = {
};



export default PageNotFound;
