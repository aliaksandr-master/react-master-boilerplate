import { Dux } from '../../../lib/reducer';



const dux = Dux('loading');


// ACTION TYPES
const ACTIVATE_REQUEST = dux.actionType('ACTIVATE_REQUEST');
const DEACTIVATE_REQUEST = dux.actionType('DEACTIVATE_REQUEST');
const ERROR_LOADING = dux.actionType('ERROR_LOADING');
const CLEAN_ERROR = dux.actionType('CLEAN_ERROR');



// ACTION CREATORS
export const incrementActionCreator = dux.actionCreator(ACTIVATE_REQUEST, (id) => id);

export const decrementActionCreator = dux.actionCreator(DEACTIVATE_REQUEST, (id) => id);

export const errorLoadingActionCreator = dux.actionCreator(ERROR_LOADING, (response) => ({
  status: response.status,
  result: response.result
}));

export const cleanLoadingErrorActionCreator = dux.actionCreator(CLEAN_ERROR);


// REDUCER
dux.reducer({
  loadedOnce: false,
  active: [],
  error: null
}, {
  [ERROR_LOADING]: (state, { payload: { status, result } }) => ({
    ...state,
    error: { status, result }
  }),

  [CLEAN_ERROR]: (state) => ({
    ...state,
    error: null
  }),

  [ACTIVATE_REQUEST]: (state, { payload: id }) => ({
    ...state,
    active: [ ...state.active, id ]
  }),

  [DEACTIVATE_REQUEST]: (state, { payload: id }) => ({
    ...state,
    active: state.active.filter((requestId) => requestId !== id)
  })
});


export default dux.compileReducer();
