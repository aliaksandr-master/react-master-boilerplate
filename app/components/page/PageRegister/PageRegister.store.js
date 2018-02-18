import { Dux } from '../../../lib/reducer';
import register from '../../../resources/api/register/post';
import commonRequestItemActionReducer from '../../../reducers/common-request-item-action';



const dux = Dux('PageRegister');


// ACTION TYPES
const REGISTER = dux.actionType('REGISTER');


// ACTION CREATORS
export const loginActionCreator = dux.actionCreator(REGISTER, ({ email, password, username }) => ({
  apiAction: register({ email, password, username })
}));


// REDUCER
dux.reducer('register', commonRequestItemActionReducer('PageLogIn:register', REGISTER));

export default dux.compileReducer();
