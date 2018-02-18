import { createReducer, actionPending, actionFulfilled, actionRejected } from '../lib/reducer';
import { RESPONSE_STATE } from '../config/constants';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';
import assertIsBoolean from '../asserts/assert-is-boolean';



export default (reducerName, ACTION_TYPE, { name = 'item', reset = false } = {}, additionalActionReducers = {}) => {
  assertTrimmedNonEmptyString(`${reducerName} ACTION_TYPE`, ACTION_TYPE);
  assertTrimmedNonEmptyString(`${reducerName} name`, name);
  assertIsBoolean(`${reducerName} reset`, reset);

  let pendingReducer;
  let rejectReducer;

  if (reset) {
    pendingReducer = (state/*, action*/) => ({
      ...state,
      [name]: null,
      responseState: RESPONSE_STATE.PENDING
    });

    rejectReducer = (state, { payload: { errors } }) => ({
      ...state,
      [name]: null,
      errors,
      responseState: RESPONSE_STATE.FAILED
    });
  } else {
    pendingReducer = (state/*, action*/) => ({
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
    [name]: null,
    errors: [],
    responseState: RESPONSE_STATE.PENDING
  }, {
    [actionPending(ACTION_TYPE)]: pendingReducer,
    [actionFulfilled(ACTION_TYPE)]: (state, { payload: { result } }) => ({
      ...state,
      [name]: result,
      errors: [],
      responseState: RESPONSE_STATE.OK
    }),
    [actionRejected(ACTION_TYPE)]: rejectReducer,
    ...additionalActionReducers
  });
};
