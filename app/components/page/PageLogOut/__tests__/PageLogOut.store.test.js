/* eslint-env browser, jest */
import reducer from '../PageLogOut.store';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});


describe('actionCreators', () => {
  const allExports = require('../PageLogOut.store'); // eslint-disable-line global-require

  Object.keys(allExports)
    .filter((exportName) => /ActionCreator$/.test(exportName))
    .forEach((exportName) => {
      test(`auto-init actionCreator ${exportName}`, () => {
        expect(reducer(undefined, allExports[exportName]())).toMatchSnapshot();
      });
    });
});
