import { Dux, actionPending, actionFulfilled, actionRejected } from '../lib/reducer';
import patchUser from '../resources/api/user__$id/patch';
import loadUser from '../resources/api/user__$id/get';
import getSession from '../resources/local/session/get';
import deleteSession from '../resources/local/session/delete';
import { RESPONSE_STATE } from '../config/constants';



const dux = Dux('user');


// ACTION TYPES
const LOAD_USER = dux.actionType('LOAD_USER');
const CHECK_AUTH = dux.actionType('CHECK_AUTH');
const UPDATE_USER = dux.actionType('UPDATE_USER');
const DELETE_AUTH = dux.actionType('DELETE_AUTH');


// ACTION CREATORS
export const loadUserActionCreator = dux.actionCreator(LOAD_USER, {
  payload: (userID) => ({ apiAction: loadUser(userID) })
});
export const updateUserActionCreator = dux.actionCreator(UPDATE_USER, {
  payload: (data) => ({ apiAction: patchUser(data) })
});
export const checkAuthActionCreator = dux.actionCreator(CHECK_AUTH, {
  payload: () => ({ apiAction: getSession() })
});
export const deleteAuthActionCreator = dux.actionCreator(DELETE_AUTH, {
  payload: () => ({ apiAction: deleteSession() })
});


// REDUCER
dux.reducer(
  {
    user: null,
    responseState: RESPONSE_STATE.PENDING,
    updatingState: RESPONSE_STATE.OK,

    authenticated: false,
    authState: RESPONSE_STATE.PENDING
  },
  {
    [actionPending(CHECK_AUTH)]: (state) => ({
      ...state,
      authState: RESPONSE_STATE.PENDING
    }),
    [actionFulfilled(CHECK_AUTH)]: (state) => ({
      ...state,
      authenticated: true,
      authState: RESPONSE_STATE.OK
    }),
    [actionRejected(CHECK_AUTH)]: (state) => ({
      ...state,
      authenticated: false,
      authState: RESPONSE_STATE.FAILED
    }),

    // deleting auth
    [actionPending(DELETE_AUTH)]: (state) => ({
      ...state,
      authState: RESPONSE_STATE.PENDING
    }),
    [actionFulfilled(DELETE_AUTH)]: (state) => ({
      ...state,
      user: null,
      responseState: RESPONSE_STATE.PENDING,
      updatingState: RESPONSE_STATE.OK,
      authenticated: false,
      authState: RESPONSE_STATE.PENDING
    }),
    [actionRejected(DELETE_AUTH)]: (state) => ({
      ...state,
      user: null,
      responseState: RESPONSE_STATE.PENDING,
      updatingState: RESPONSE_STATE.OK,
      authenticated: false,
      authState: RESPONSE_STATE.PENDING
    }),

    // load
    [actionPending(LOAD_USER)]: (state) => ({
      ...state,
      responseState: RESPONSE_STATE.PENDING,
      updatingState: RESPONSE_STATE.PENDING
    }),
    [actionFulfilled(LOAD_USER)]: (state, { payload: { result } }) => ({
      ...state,
      user: result,
      responseState: RESPONSE_STATE.OK,
      updatingState: RESPONSE_STATE.OK
    }),
    [actionRejected(LOAD_USER)]: (state, { payload: { result } }) => ({
      ...state,
      user: result,
      responseState: RESPONSE_STATE.FAILED,
      updatingState: RESPONSE_STATE.FAILED
    }),

    // update
    [actionPending(UPDATE_USER)]: (state) => ({
      ...state,
      userUpdatingState: RESPONSE_STATE.PENDING
    }),
    [actionFulfilled(UPDATE_USER)]: (state, { payload: { result } }) => ({
      ...state,
      user: result,
      updatingState: RESPONSE_STATE.OK
    })
  }
);


export default dux.compileReducer();
