import { createReducer } from '../lib/reducer';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';



export default (reducerName, ACTION_TYPE_ACTIVATE, ACTION_TYPE_DEACTIVATE, additionalActionReducers = {}) => {
  assertTrimmedNonEmptyString('reducerName', reducerName);
  assertTrimmedNonEmptyString(`${reducerName} ACTION_TYPE_ACTIVATE`, ACTION_TYPE_ACTIVATE);
  assertTrimmedNonEmptyString(`${reducerName} ACTION_TYPE_DEACTIVATE`, ACTION_TYPE_DEACTIVATE);

  return createReducer(reducerName, {
    isActive: false,
    params: null
  }, {
    [ACTION_TYPE_ACTIVATE]: (state, { payload: params = null }) => ({
      ...state,
      isActive: true,
      params
    }),
    [ACTION_TYPE_DEACTIVATE]: (state) => ({
      ...state,
      isActive: false,
      params: null
    }),
    ...additionalActionReducers
  });
};
