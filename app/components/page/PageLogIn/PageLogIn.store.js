import { Dux } from '../../../lib/reducer';
import login from '../../../resources/api/login/post';
import commonRequestItemActionReducer from '../../../reducers/common-request-item-action';



const dux = Dux('PageLogIn');


// ACTION TYPES
const LOGIN = dux.actionType('LOGIN');


// ACTION CREATORS
export const loginActionCreator = dux.actionCreator(LOGIN, ({ email, password }) => ({
  apiAction: login({ email, password })
}));


// REDUCER
dux.reducer('login', commonRequestItemActionReducer('PageLogIn:login', LOGIN));

export default dux.compileReducer();
