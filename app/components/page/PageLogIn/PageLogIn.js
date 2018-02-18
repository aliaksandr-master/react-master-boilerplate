import { compose, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux-self';
import update, { callWhenAreInitialized } from 'react-updating-hoc';
import { referring } from 'react-composite-router';
import { checkAuthActionCreator } from '../../../reducers/user';
import instead from '../../hoc/instead';
import { RESPONSE_STATE } from '../../../config/constants';
import PageLogInComponent from './PageLogIn.view';
import reducer, { loginActionCreator } from './PageLogIn.store';



export default compose(
  connect({
    reducer,
    getters: [
      (self) => self,
      (_1, { user }) => user
    ],
    selector: ({ login }, user) => ({
      login,
      authState: user.authState,
      hasAuth: user.authenticated
    }),
    mapDispatchToProps: {
      loginAction: loginActionCreator,
      checkAuthAction: checkAuthActionCreator
    }
  }),
  withProps(() => ({ state: 'app' })),
  referring(),
  update(
    callWhenAreInitialized(({ checkAuthAction, hasAuth, state }) => {
      if (hasAuth) {
        state.apply();
        return;
      }

      checkAuthAction()
        .then(() => state.apply());
    })
  ),
  instead(({ authState }) => authState === RESPONSE_STATE.PENDING, () => null),
  withHandlers({
    handleSubmit: ({ state, loginAction }) => (values) => {
      loginAction(values)
        .then(() => state.apply());
    }
  })
)(PageLogInComponent);
