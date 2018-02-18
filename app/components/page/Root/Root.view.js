import React from 'react';
import PropTypes from 'prop-types';
import { Slot, Router } from 'react-composite-router';
import LoadingBar from '../../ui/LoadingBar';
import PageNotFound from '../PageNotFound';
import './Root.view.less';



const Root = ({ children, history, routes, onStateChange }) => (
  <Router history={history} onChange={onStateChange} routes={routes}>
    <div className="Root">
      <LoadingBar selfID="global" />
      <Slot name="root">
        <div>{children ? children : <PageNotFound />}</div>
      </Slot>
    </div>
  </Router>
);



Root.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onStateChange: PropTypes.func // from container
};



Root.defaultProps = {
};



export default Root;
