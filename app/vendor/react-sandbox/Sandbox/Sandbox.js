import { compose } from 'recompose';
import update, { callWhenAreInitialized } from 'react-updating-hoc';
import { connect } from 'react-redux-self';
import reducer, { getAllComponentsAction } from './Sandbox.store';
import SandboxComponent from './Sandbox.jsx';



export default compose(
  connect({
    reducer,
    getters: [
      (self) => self,
      ({ components }) => components
    ],
    selector: (self, components) => ({
      ...self,
      components
    }),
    mapDispatchToProps: {
      getAllComponentsAction
    }
  }),
  update(
    callWhenAreInitialized(({ getAllComponentsAction }) => {
      getAllComponentsAction();
    })
  )
)(SandboxComponent);
