/* eslint-env browser, jest */

import reducer from '../LoadingBar.store';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});



describe('actionCreators', () => {
  const allExports = require('../LoadingBar.store'); // eslint-disable-line global-require

  Object.keys(allExports)
    .filter((exportName) => /ActionCreator$/.test(exportName))
    .forEach((exportName) => {
      test(`auto-init actionCreator ${exportName}`, () => {
        if (exportName === 'errorLoadingActionCreator') {
          expect(allExports[exportName]({ result: 'some', status: 200 })).toMatchSnapshot();
        } else {
          expect(reducer(undefined, allExports[exportName]())).toMatchSnapshot();
        }
      });
    });
});
