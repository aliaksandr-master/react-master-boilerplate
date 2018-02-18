/* eslint-env browser, jest */

import reducer from '../LoadingBar.store';



describe('reducer', () => {
  it('should set initialState', () => {
    const newState = reducer(undefined, {});

    expect(newState).not.toEqual(undefined);
  });
});
