import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { cyan500, cyan700, pinkA200, grey100, grey300, grey400, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';
// import spacing from 'material-ui/styles/spacing';
// import { fade } from 'material-ui/utils/colorManipulator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ThemeProvider } from 'react-jss';
import './vendor';
import './lib/reset.less';
import './index-sandbox.less';
import Root from './components/page/Root';
import root from './lib/root';
import createStore from './lib/store';
import history from './lib/history';
import { routesTree } from './vendor/react-sandbox';
import mainRoutesTree from './routes';



const routes = { ...routesTree.getRoutes(), ...mainRoutesTree.getRoutes() };
const store = createStore({ setNotifiers: true });

const theme = {

};

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider>
        <Root routes={routes} history={history} />
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>,
  root
);
