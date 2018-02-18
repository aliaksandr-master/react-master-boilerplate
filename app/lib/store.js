import { compose } from 'recompose';
import { createStore, applyMiddleware, combineReducers } from 'redux'; // eslint-disable-line deprecate/import
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import routerReducer from 'react-composite-router/lib/redux/reducer';
import { reducer as selfComponentReducer, configure as configureSelf } from 'react-redux-self';
import { LOGGER } from '../config';
import { reducer as dbReducer, middleware as fetchMiddleware } from '../vendor/multi-routing-api';
import { reducer as loadingReducer, incrementActionCreator, decrementActionCreator, errorLoadingActionCreator } from '../components/ui/LoadingBar';
import promiseMiddleware from '../vendor/redux-promise-middleware';
import { setBeginNotifier, setEndNotifier } from '../resources/api/origin';
import userReducer from '../reducers/user';
import { checkActionFormatMiddleware, duxMiddleware } from './reducer';



configureSelf({
  reducerName: 'self',
  selfIdByComponentName: __ASSERTS_ENABLED__,
  denormalizeEntitiesGetter: (_1, { db }) => db
});



export default ({ setNotifiers = false } = {}) => {
  const reduxDevToolCompose = __ASSERTS_ENABLED__ ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

  const middleware = [
    thunkMiddleware,
    duxMiddleware(),
    __ASSERTS_ENABLED__ ? checkActionFormatMiddleware() : null,
    fetchMiddleware(),
    promiseMiddleware(),
    LOGGER ? createLogger({ collapsed: true }) : null
  ].filter(Boolean);

  const store = createStore(
    combineReducers({
      db: dbReducer,
      user: userReducer,
      self: selfComponentReducer,
      loading: loadingReducer,
      routerState: routerReducer
    }),
    reduxDevToolCompose(applyMiddleware(...middleware))
  );

  if (setNotifiers) {
    setBeginNotifier(({ requestID }/*, response*/) => {
      store.dispatch(incrementActionCreator(requestID));
    });

    setEndNotifier(({ requestID }, response) => {
      store.dispatch(decrementActionCreator(requestID));

      if (!response.options.$disableServerErrorPopup) {
        if (response.status >= 500 || !response.status) {
          store.dispatch(errorLoadingActionCreator(response));
        }
      }
    });
  }

  return store;
};
