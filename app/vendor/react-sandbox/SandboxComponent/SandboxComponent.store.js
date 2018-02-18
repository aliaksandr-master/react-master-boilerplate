/* global require */

import isPlainObject from 'lodash/isPlainObject';
import { actionsFactory } from 'react-redux-self';
import { RESPONSE_STATE } from './SandboxComponent.const';



const action = actionsFactory('SandboxComponent');



// ACTIONS
const LOAD_COMPONENT = action('LOAD_COMPONENT');
const SET_NEW_PROPS = action('SET_NEW_PROPS');
const UPDATE_SYS_PROPS = action('UPDATE_SYS_PROPS');
const CHANGE_COLOR = action('CHANGE_COLOR');
const CALL_HANDLER = action('CALL_HANDLER');
const CLEAR_CALL_HANDLER = action('CLEAR_CALL_HANDLER');


// HELPERS
export const getComponentDataSandboxByName = (componentId, dir, modificationName = 'default') => {
  const sandbox = require(`../../../components/${dir}/${componentId}.sandbox.js`).default; // eslint-disable-line global-require, import/no-dynamic-require

  const variations = Object.keys(sandbox);

  const variation = sandbox[modificationName];

  return {
    ...variation,
    wrapperState: variation.wrapperState || {},
    wrapperHandlers: variation.wrapperHandlers || {},
    handlers: variation.handlers || {},
    name: componentId,
    variations
  };
};



// ACTION CREATORS
export const setNewPropsAction = (payload) => ({
  type: SET_NEW_PROPS,
  payload
});

export const cleanHandlersCallStack = () => ({
  type: CLEAR_CALL_HANDLER,
  payload: {}
});


export const updateSysPropsAction = (name = {}, value = null) => ({
  type: UPDATE_SYS_PROPS,
  payload: {
    ...(isPlainObject(name) ? name : { [name]: value })
  }
});


export const changeColorAction = (newColor) => ({
  type: CHANGE_COLOR,
  payload: {
    color: newColor
  }
});


export const callHandlerAction = (handlerName, args = []) => ({
  type: CALL_HANDLER,
  payload: {
    handlerName,
    args: args.map((arg) => {
      try {
        JSON.stringify(arg);
      } catch (err) {
        return err;
      }

      return arg;
    })
  }
});


export const loadComponentAction = (component, variation) => {
  const sandbox = getComponentDataSandboxByName(component.id, component.dir, variation);

  return {
    type: LOAD_COMPONENT,
    payload: {
      sysProps: sandbox.wrapperState,
      variations: sandbox.variations,
      props: sandbox.props
    }
  };
};



// REDUCER
export default (state = {
  propTypes: {},
  props: {},
  sysProps: {},
  handlerCallStack: [],
  backgroundColor: 'white',
  variations: [ 'default' ],
  responseState: RESPONSE_STATE.PENDING
}, action) => {
  if (action.type === CALL_HANDLER) {
    const { payload: { handlerName, args } } = action;

    return {
      ...state,
      handlerCallStack: [ { name: handlerName, args }, ...state.handlerCallStack ]
    };
  }

  if (action.type === CLEAR_CALL_HANDLER) {
    return {
      ...state,
      handlerCallStack: []
    };
  }

  if (action.type === CHANGE_COLOR) {
    return {
      ...state,
      backgroundColor: action.payload.color
    };
  }

  if (action.type === SET_NEW_PROPS) {
    return {
      ...state,
      props: { ...state.props, ...action.payload }
    };
  }

  if (action.type === UPDATE_SYS_PROPS) {
    return {
      ...state,
      sysProps: { ...state.sysProps, ...action.payload }
    };
  }

  if (action.type === LOAD_COMPONENT) {
    return {
      ...state,
      sysProps: action.payload.sysProps || {},
      variations: action.payload.variations,
      props: action.payload.props,
      propTypes: action.payload.propTypes,
      responseState: RESPONSE_STATE.OK
    };
  }

  return state;
};
