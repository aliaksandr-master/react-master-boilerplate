import { Dux } from '<%= _relPath("app/lib/reducer") %>';
//import { RESPONSE_STATE } from '<%= _relPath("app/config/constants") %>';



const dux = Dux('<%= name %>');
//const DO_SOMETHING = dux.actionType('LOAD_SOMETHING');


//export const loadSomethingActionCreator = dux.actionCreator(DO_SOMETHING, (payload, arg2, arg3) => payload);


dux.reducer({
}, {
  //  [DO_SOMETHING]: (state, { payload }) => ({
  //    ...state
  //  })
  //})
});

export default dux.compileReducer();
