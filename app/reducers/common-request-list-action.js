import { createReducer, actionPending, actionFulfilled, actionRejected } from '../lib/reducer';
import { RESPONSE_STATE } from '../config/constants';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';
import assertIsBoolean from '../asserts/assert-is-boolean';



export default (reducerName, ACTION_TYPE, { name = 'items', reset = false } = {}, additionalActionReducers = {}) => {
  assertTrimmedNonEmptyString(`${reducerName} ACTION_TYPE`, ACTION_TYPE);
  assertTrimmedNonEmptyString(`${reducerName} name`, name);
  assertIsBoolean(`${reducerName} reset`, reset);

  let pendingReducer;
  let rejectReducer;

  if (reset) {
    pendingReducer = (state) => ({
      ...state,
      [name]: [],
      errors: [],
      total: 0,
      responseState: RESPONSE_STATE.PENDING
    });

    rejectReducer = (state, { payload: { errors } }) => ({
      ...state,
      [name]: [],
      errors,
      total: 0,
      responseState: RESPONSE_STATE.FAILED
    });
  } else {
    pendingReducer = (state) => ({
      ...state,
      responseState: RESPONSE_STATE.PENDING
    });

    rejectReducer = (state, { payload: { errors } }) => ({
      ...state,
      errors,
      responseState: RESPONSE_STATE.FAILED
    });
  }

  return createReducer(reducerName, {
    [name]: [],
    errors: [],
    responseState: null,
    total: 0
  }, {
    [actionPending(ACTION_TYPE)]: pendingReducer,
    [actionRejected(ACTION_TYPE)]: rejectReducer,
    [actionFulfilled(ACTION_TYPE)]: (state, { payload: { result, listInfo: { total } } }) => ({
      ...state,
      [name]: result,
      total,
      errors: [],
      responseState: RESPONSE_STATE.OK
    }),
    ...additionalActionReducers
  });
};
