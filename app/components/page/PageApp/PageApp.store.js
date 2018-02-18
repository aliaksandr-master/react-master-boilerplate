import { Dux } from '../../../lib/reducer';
import getSession from '../../../resources/local/session/get';
import commonRequestItemAction from '../../../reducers/common-request-item-action';



const dux = Dux('PageApp');



// ACTION TYPES
const LOAD_SESSION = dux.actionType('LOAD_SESSION');


// ACTION CREATORS
export const loadSessionActionCreator = dux.actionCreator(LOAD_SESSION, () => ({
  apiAction: getSession()
}));


// REDUCER
dux.reducer('session', commonRequestItemAction('PageApp:sessionLoading', LOAD_SESSION));

export default dux.compileReducer();
