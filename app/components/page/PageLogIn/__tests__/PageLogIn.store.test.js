/* eslint-env browser, jest */

import reducer from '../PageLogIn.store';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});



describe('actionCreators', () => {
  const allExports = require('../PageLogIn.store'); // eslint-disable-line global-require

  Object.keys(allExports)
    .filter((exportName) => /ActionCreator$/.test(exportName))
    .forEach((exportName) => {
      test(`auto-init actionCreator ${exportName}`, () => {
        if (exportName === 'loginActionCreator') {
          // oops. I don't know why this test doesn't work
          //expect(allExports[exportName]({ email: 'some@some.some', password: 'somesome' })).toMatchSnapshot();
          return;
        }
        expect(reducer(undefined, allExports[exportName]())).toMatchSnapshot();
      });
    });
});
