import { compose, withHandlers } from 'recompose';
import update, { callWhenAreInitialized, callWhenPropsAreUpdated } from 'react-updating-hoc';
import { changeStateAction } from 'react-composite-router/lib/redux/reducer';
import { connect } from 'react-redux-self';
import { disableMainPreloader } from '../../../lib/preloader';
import App from './Root.view';



export default compose(
  connect({
    getters: [
      (_1, { loading: { loadingOnce } }) => loadingOnce
    ],
    selector: (loadingOnce) => ({
      loadingOnce
    }),
    mapDispatchToProps: {
      changeStateAction
    }
  }),
  withHandlers({
    onStateChange: ({ changeStateAction }) => (name, params) => {
      changeStateAction(name, params);
    }
  }),
  update(
    callWhenAreInitialized(() => {
      disableMainPreloader();
    }),
    callWhenPropsAreUpdated([ 'loadingOnce' ], () => {
      disableMainPreloader();
    })
  )
)(App);
