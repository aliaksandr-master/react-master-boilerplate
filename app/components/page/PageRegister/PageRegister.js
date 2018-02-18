import { compose, withHandlers, withProps, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux-self';
import update, { callWhenAreInitialized } from 'react-updating-hoc';
import { referring } from 'react-composite-router';
import { checkAuthActionCreator } from '../../../reducers/user';
import { logUnhandledCatch } from '../../../lib/log';
import PageRegisterComponent from './PageRegister.view';
import reducer, { loginActionCreator } from './PageRegister.store';



export default compose(
  connect({
    reducer,
    getters: [
      (self) => self,
      (_1, { user }) => user.authenticated
    ],
    selector: ({ register }, hasAuth) => ({
      register,
      hasAuth
    }),
    mapDispatchToProps: {
      loginAction: loginActionCreator,
      checkAuthAction: checkAuthActionCreator
    }
  }),
  withPropsOnChange([], () => ({
    initialValue: { password: '', confirm: '', username: '', email: '' }
  })),
  withProps(() => ({ state: 'app' })),
  referring(),
  update(
    callWhenAreInitialized(({ checkAuthAction, hasAuth, state }) => {
      if (hasAuth) {
        state.apply();
        return;
      }

      checkAuthAction()
        .then(() => state.apply())
        .catch(logUnhandledCatch());
    })
  ),
  withHandlers({
    handleSubmit: ({ state, loginAction }) => (values) => {
      loginAction(values)
        .then(() => state.apply())
        .catch(logUnhandledCatch());
    }
  })
)(PageRegisterComponent);
