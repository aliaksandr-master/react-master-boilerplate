import update, { callWhenAreInitialized } from 'react-updating-hoc';
import { compose, mapProps, setDisplayName } from 'recompose';
import { referring } from 'react-composite-router';
import { connect } from 'react-redux-self';
import { setEntitiesAction as setEntitiesActionCreator } from 'multi-routing-api/lib/redux';
import { deleteAuthActionCreator } from '../../../reducers/user';
import { logUnhandledCatch } from '../../../lib/log';
import reducer, { logoutActionCreator } from './PageLogOut.store';
import PageLogOutComponent from './PageLogOut.view';



export default compose(
  setDisplayName('PageLogOut'),
  mapProps(() => ({ state: 'login', reload: true })),
  connect({
    reducer,
    mapDispatchToProps: {
      deleteAuthAction: deleteAuthActionCreator,
      logoutAction: logoutActionCreator,
      setEntitiesAction: setEntitiesActionCreator
    }
  }),
  referring(),
  update(
    callWhenAreInitialized(({ state, deleteAuthAction, setEntitiesAction/*, logoutAction*/ }) => {
      Promise.resolve()
        // .then(() => logoutAction({}).catch(() => null))
        .then(() => setEntitiesAction({}))
        .then(() => deleteAuthAction({}))
        .then(() => state.apply(), () => state.apply())
        .catch(logUnhandledCatch());
    })
  )
)(PageLogOutComponent);
