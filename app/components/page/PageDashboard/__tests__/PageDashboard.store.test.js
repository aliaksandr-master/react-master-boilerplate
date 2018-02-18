/* eslint-env browser, jest */

import forEach from 'lodash/forEach';
import reducer from '../PageDashboard.store';
import { DASHBOARD } from '../../../../config/dashboard';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});



describe('actionCreators', () => {
  const allExports = require('../PageDashboard.store'); // eslint-disable-line global-require

  Object.keys(allExports)
    .filter((exportName) => /ActionCreator$/.test(exportName))
    .filter(() => true/* put actionCreator's name here to exclude from tests */)
    .forEach((exportName) => {
      test(`auto-init actionCreator ${exportName}`, () => {
        expect(reducer(undefined, {}, allExports[exportName]())).toMatchSnapshot();
      });
    });
});
