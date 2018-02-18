import { Dux } from '../../../lib/reducer';
import logout from '../../../resources/api/logout/post';



const dux = Dux('PageLogOut');
const LOGOUT = dux.actionType('LOAD_SOMETHING');


export const logoutActionCreator = dux.actionCreator(LOGOUT, () => ({
  apiAction: logout()
}));


dux.reducer({
}, {
  //  [DO_SOMETHING]: (state, { payload }) => ({
  //    ...state
  //  })
  //})
});

export default dux.compileReducer();
