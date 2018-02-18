/* eslint-env browser, jest */
import reducer from '../<%= name %>.store';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});


describe('actionCreators', () => {
  const allExports = require('../<%= name %>.store'); // eslint-disable-line global-require

  Object.keys(allExports)
    .filter((exportName) => /ActionCreator$/.test(exportName))
    .forEach((exportName) => {
      test(`auto-init actionCreator ${exportName}`, () => {
        //if (exportName === 'someActionCreator') {
        //  expect(allExports.someActionCreator('someparam')).toMatchSnapshot();
        //  return;
        //}
        expect(reducer(undefined, allExports[exportName]())).toMatchSnapshot();
      });
    });
});
