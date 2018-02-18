import { compose, withHandlers } from 'recompose';
import memoize from 'lodash/memoize';
import update, { callWhenAreInitialized } from 'react-updating-hoc';
import { autofill, initialize } from 'redux-form';
import { connect } from 'react-redux-self';
import reducer, {
  setNewPropsAction,
  loadComponentAction,
  callHandlerAction,
  cleanHandlersCallStack,
  updateSysPropsAction,
  getComponentDataSandboxByName,
  changeColorAction
} from './SandboxComponent.store';
import SandboxComponent from './SandboxComponent.jsx';



export default compose(
  connect({
    reducer,
    getters: [
      (self) => self,
      (_1, { db }) => db,
      (_1, _2, { component }) => component,
      (_1, _2, { variation }) => variation,
      (_1, { routerState: { params: { componentId } } }) => componentId
    ],
    selector: (self, db, component, variation, componentId) => {
      if (!component) {
        return {
          ...self,
          componentId,
          component: null,
          CurrentComponent: null
        };
      }

      const sandbox = getComponentDataSandboxByName(component.name, component.dir, variation);

      return ({
        ...self,
        handlers: sandbox.handlers,
        wrapperHandlers: sandbox.wrapperHandlers,
        componentId,
        component,
        CurrentComponent: sandbox.template
      });
    },
    mapDispatchToProps: {
      setFormProp: autofill,
      initForm: initialize,
      callHandlerAction,
      cleanHandlersCallStack,
      setNewPropsAction,
      changeColorAction,
      updateSysPropsAction,
      loadComponentAction
    }
  }),
  update(
    callWhenAreInitialized(({ loadComponentAction, initForm, component, selfID, variation }, isInit) => {
      if (!isInit) {
        initForm(selfID);
      }

      loadComponentAction(component, variation);
    })
  ),
  withHandlers({
    handleColorChange: ({ changeColorAction }) => memoize((color) => () => {
      changeColorAction(color);
    }),
    resetFormValues: ({ initForm, selfID }) => () => {
      initForm(selfID);
    }
  })
)(SandboxComponent);
