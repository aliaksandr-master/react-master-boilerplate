import { actionsFactory } from 'react-redux-self';
import getAllComponents from '../get-all-components';
import { RESPONSE_STATE } from './Sandbox.const';



const action = actionsFactory('Sandbox');



// ACTIONS
const GET_ALL_COMPONENTS__PENDING = action('GET_ALL_COMPONENTS__PENDING');
const GET_ALL_COMPONENTS__FULFILLED = action('GET_ALL_COMPONENTS__FULFILLED');
const GET_ALL_COMPONENTS__REJECTED = action('GET_ALL_COMPONENTS__REJECTED');



// ACTION CREATORS
export const getAllComponentsAction = () => (dispatch) => {
  const result = dispatch({
    type: GET_ALL_COMPONENTS__PENDING,
    payload: {}
  });

  getAllComponents()
    .catch((response) =>
      dispatch({
        type: GET_ALL_COMPONENTS__REJECTED,
        payload: response
      })
    )
    .then((response) =>
      dispatch({
        type: GET_ALL_COMPONENTS__FULFILLED,
        payload: response
      })
    );

  return result;
};



// REDUCER
export default (state = {
  components: [],
  componentsResponseState: RESPONSE_STATE.PENDING
}, action) => {
  if (action.type === GET_ALL_COMPONENTS__PENDING) {
    return {
      ...state,
      components: [],
      componentsResponseState: RESPONSE_STATE.PENDING
    };
  }

  if (action.type === GET_ALL_COMPONENTS__FULFILLED) {
    return {
      ...state,
      components: action.payload.result,
      componentsResponseState: RESPONSE_STATE.OK
    };
  }

  if (action.type === GET_ALL_COMPONENTS__REJECTED) {
    return {
      ...state,
      components: [],
      componentsResponseState: RESPONSE_STATE.FAILED
    };
  }

  return state;
};
