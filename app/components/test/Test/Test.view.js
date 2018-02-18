import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-composite-router';
import isFunction from 'lodash/isFunction';
// import { cyan500, cyan700, pinkA200, grey100, grey300, grey400, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
// import spacing from 'material-ui/styles/spacing';
// import { fade } from 'material-ui/utils/colorManipulator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ThemeProvider } from 'react-jss';
import history from '../../../lib/history';
import createStore from '../../../lib/store';
import routesTree from '../../../routes/index';



const store = createStore();

const theme = {};



const Test = ({ children }) => (
  <Provider store={store}>
    <Router routes={routesTree.getRoutes()} history={history}>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider>
          {isFunction(children) ? children() : (children)}
        </MuiThemeProvider>
      </ThemeProvider>
    </Router>
  </Provider>
);



Test.propTypes = {
  children: PropTypes.any.isRequired
};



Test.defaultProps = {
};



export default Test;
