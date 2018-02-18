import { combineReducers, compose } from 'redux'; // eslint-disable-line deprecate/import
import forEach from 'lodash/forEach';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';
import { isFSA } from 'flux-standard-action';
import { actionsFactory } from 'react-redux-self';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';
import assertPlainObject from '../asserts/assert-is-plain-object';
import assertIsFunction from '../asserts/assert-is-function';
import assertDiff from '../asserts/assert-diff';
import assertHasInconsistentTypes from '../asserts/assert-inconsistent-types';
import { actionFulfilled, actionRejected, actionPending } from '../vendor/redux-promise-middleware';
import { recursiveConst, recursiveUnpackConst } from './const';
import { logError } from './log';



export { actionFulfilled, actionRejected, actionPending };



const GLOBAL_PREFIX = '@@';

export const _GLOBAL_PREFIX = GLOBAL_PREFIX; // only for tests



const checkActionFormat = (action) => {
  if (__ASSERTS_ENABLED__) {
    if (!isString(action)) {
      throw new Error(`action "${action}" must have string type`);
    }
    if (!/^@*(\[[^\]]+])?[a-zA-Z0-9_/:]+$/.test(action)) {
      throw new Error(`action "${action}" has invalid symbols`);
    }
  }

  return action;
};

export const _checkActionFormat = checkActionFormat; // only for tests


const createActionCreator = (type, payloadFactory = (firstArg) => firstArg, metaFactory = null) => {
  if (__ASSERTS_ENABLED__) {
    assertTrimmedNonEmptyString('createActionCreator type', type);
    assertIsFunction(`createActionCreator ${type} payloadFactory`, payloadFactory);

    if (metaFactory !== null) {
      assertIsFunction(`createActionCreator ${type} metaFactory`, metaFactory);

      const _metaFactory = metaFactory;

      metaFactory = (...args) => {
        const meta = _metaFactory(...args);

        assertPlainObject(`action "${type}" meta`, meta);

        return meta;
      };
    }
  }

  if (metaFactory !== null) {
    return (...args) => ({
      type,
      payload: payloadFactory(...args),
      meta: metaFactory(...args)
    });
  }

  return (...args) => {
    return ({
      type,
      payload: payloadFactory(...args)
    });
  };
};



const actionGlobal = (action) =>
  `${GLOBAL_PREFIX}${checkActionFormat(action)}`;

export const _actionGlobal = actionGlobal;



export const actionFactoryGlobal = (prefix) =>
  (name) => actionGlobal(`${prefix}/${name}`);


export const createReducer = (reducerName, initialState = {}, actionsMap) => {
  if (__ASSERTS_ENABLED__) {
    assertTrimmedNonEmptyString('reducerName', reducerName);
    assertPlainObject('actionsReducersMap', actionsMap);

    if (!actionsMap) {
      throw new Error('action map is empty');
    }

    if (!Array.isArray(initialState) && !isFunction(initialState)) {
      assertPlainObject('initialState', initialState);
    }
  }

  actionsMap = reduce(actionsMap, (map, actionReducer, actionType) => {
    if (isPlainObject(actionReducer)) {
      if (__ASSERTS_ENABLED__) {
        if (isEmpty(actionReducer)) {
          throw new Error(`actionObject of "${actionType}" is empty`);
        }
      }

      const value = actionReducer;

      actionReducer = (state) => ({ ...state, ...value });
    }

    if (__ASSERTS_ENABLED__) {
      assertIsFunction(`actionReducer of "${actionType}"`, actionReducer);
    }

    map[actionType] = actionReducer;

    return map;
  }, {});

  actionsMap = Object.keys(actionsMap)
    .map((actionName) => ({
      reducer: actionsMap[actionName],
      nameSegments: actionName.trim().split(/\s*,\s*/)
    }))
    .sort((action1, action2) => action1.nameSegments.length - action2.nameSegments.length)
    .reduce((actionsMap, { reducer, nameSegments }) => {
      nameSegments.forEach((actionName) => {
        if (actionsMap.hasOwnProperty(actionName)) {
          const simpleReducer = actionsMap[actionName];

          actionsMap[actionName] = (state, action) => {
            const newState = reducer(state);

            return simpleReducer(newState, action);
          };
        } else {
          actionsMap[actionName] = reducer;
        }
      });

      return actionsMap;
    }, {});

  if (__ASSERTS_ENABLED__) {
    forEach(actionsMap, (actionReducer, actionName) => {
      checkActionFormat(actionName);
    });

    actionsMap = reduce(actionsMap, (actionsMap, reducer, actionType) => ({
      ...actionsMap,
      [actionType]: (state, action) => {
        state = recursiveConst(`${reducerName} state`, state, { checkUndefinedProps: false });

        let nextState = reducer(state, action);

        nextState = recursiveUnpackConst(nextState);

        return nextState;
      }
    }), {});
  }

  actionsMap = new Map(Object.entries(actionsMap));

  let realInitialState = null;

  return (state, action) => {
    if (state === undefined) {
      realInitialState = state = isFunction(initialState) ? initialState() : initialState;
    }

    if (!actionsMap.has(action.type)) {
      return state;
    }

    const nextState = actionsMap.get(action.type)(state, action);

    if (__ASSERTS_ENABLED__) {
      assertDiff('modified and initial states', Object.keys(realInitialState), Object.keys(nextState));
      assertHasInconsistentTypes('modified and initial states', realInitialState, nextState);
    }

    return nextState;
  };
};



export const checkActionFormatMiddleware = () => () => (next) => (action) => {
  if (isFunction(action)) {
    return next(action);
  }

  if (__ASSERTS_ENABLED__) {
    if (action.type.startsWith('@@self') || action.type.startsWith('@@redux-form') || action.type.startsWith('@@router')) {
      return next(action);
    }

    try {
      checkActionFormat(action.type);
    } catch (err) {
      logError(err);
    }

    if (!isFSA(action)) {
      logError(new Error(`action "${action.type}" has not FSA format`));
    }

    if (action.meta !== undefined && !isPlainObject(action.meta)) {
      logError(new Error(`meta of "${action.type}" must be plain object`));
    }
  }

  return next(action);
};


const mapToObj = (map, filter = (value, _key) => value) => {
  const actionsMap = {};

  map.forEach((value, key) => {
    actionsMap[key] = filter(value, key);
  });

  return actionsMap;
};


let listOfMiddleWares = [];


export const Dux = (basicName, isGlobal = /^[a-z]/.test(basicName)) => {
  const mkActionType = isGlobal ? actionFactoryGlobal(basicName) : actionsFactory(basicName);
  let flushed = false;
  let mainReducer = null;
  const reducerMakersMap = new Map();

  const checkFlushed = () => {
    if (flushed) {
      throw new Error('store has already flushed');
    }
  };

  return {
    middleware (midlvr) {
      checkFlushed();

      listOfMiddleWares = [ ...listOfMiddleWares, midlvr ];
    },

    reducer (subName, initialState = {}, actionsMap = {}) {
      checkFlushed();

      let reducer = null;

      if (!isString(subName)) {
        actionsMap = initialState;
        initialState = subName;
        subName = null;
      }

      if (isFunction(initialState)) {
        reducer = initialState;
        initialState = null;
        actionsMap = null;
      }

      if (!reducer) {
        reducer = createReducer(`${basicName}${subName ? `:${subName}` : ''}`, initialState, actionsMap);
      }

      if (subName) {
        if (mainReducer) {
          throw new ReferenceError('you should not create sub-reducer when mainReducer has already defined');
        }

        reducerMakersMap.set(subName, reducer);
      } else {
        if (reducerMakersMap.length) {
          throw new ReferenceError('you should not create mainReducer when some sub-reducer has already defined');
        }

        mainReducer = reducer;
      }
    },

    compileReducer () {
      checkFlushed();

      flushed = true;

      return mainReducer ? mainReducer : combineReducers(mapToObj(reducerMakersMap));
    },

    actionType (typeName) {
      checkFlushed();

      return mkActionType(typeName);
    },

    actionCreator (type, payloadFactory = () => {}) {
      const { payload, meta } = isFunction(payloadFactory) ? { payload: payloadFactory, meta: undefined } : { payload: payloadFactory.payload, meta: payloadFactory.meta };

      checkFlushed();

      if (isFunction(type)) {
        return type;
      }

      return createActionCreator(type, payload, meta);
    }
  };
};

export const duxMiddleware = () => (store) => (next) => {
  let dispatch = (action) => next(action);
  let initialized = false;

  return (action) => {
    if (!initialized && listOfMiddleWares.length) {
      initialized = true;

      const chain = listOfMiddleWares.map((middleware) => middleware(store));

      dispatch = compose(...chain)(next);
    }

    return dispatch(action);
  };
};
