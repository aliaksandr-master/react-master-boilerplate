import { compose, mapProps } from 'recompose';
import update, { callWhenAreInitialized, callWhenPropsAreUpdated } from 'react-updating-hoc';
import { Redirect } from 'react-composite-router';
import { connect } from 'react-redux-self';
import UserSchema from '../../../entities/UserSchema';
import instead from '../../hoc/instead';
import { RESPONSE_STATE } from '../../../config/constants';
import { loadUserActionCreator } from '../../../reducers/user';
import PageApp from './PageApp.view';
import reducer, { loadSessionActionCreator } from './PageApp.store';



const Logout = mapProps(() => ({ state: 'logout' }))(Redirect);


export default compose(
  connect({
    reducer,
    getters: [
      (self) => self,
      (_1, { user }) => user
    ],
    selector: ({ session }, user) => ({
      sessionUserID: (session.result || {}).user_id || null,
      sessionResponseState: session.responseState,
      user: user.user,
      userResponseState: user.responseState
    }),
    denormalize: {
      user: UserSchema
    },
    mapDispatchToProps: {
      loadSessionAction: loadSessionActionCreator,
      loadUserAction: loadUserActionCreator
    }
  }),
  update(
    callWhenAreInitialized(({ loadSessionAction }) => {
      loadSessionAction();
    }),
    callWhenPropsAreUpdated([ 'sessionResponseState' ], ({ loadUserAction, sessionResponseState, sessionUserID }) => {
      if (sessionResponseState === RESPONSE_STATE.OK && sessionUserID) {
        loadUserAction(sessionUserID);
      }
    })
  ),
  instead(({ userResponseState, sessionResponseState }) => userResponseState === RESPONSE_STATE.FAILED || sessionResponseState === RESPONSE_STATE.FAILED, Logout),
  instead(({ userResponseState, sessionResponseState }) => userResponseState === RESPONSE_STATE.PENDING || sessionResponseState === RESPONSE_STATE.PENDING)
)(PageApp);
