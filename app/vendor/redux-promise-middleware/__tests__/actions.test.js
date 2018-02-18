/*eslint-env jest, browser*/

import { actionPending, actionFulfilled, actionRejected } from '../index';



const PROMISE_DONE_SUF = '_DONE';
const PROMISE_FAILED_SUF = '_FAILED';
const PROMISE_PENDING_SUF = '_PENDING';



describe('actionRejected', () => {
  it('should pass value if valid', () => {
    const action = actionRejected('ACTION');

    expect(action).toEqual(`ACTION_${PROMISE_FAILED_SUF}`);
  });
});



describe('actionPending', () => {
  it('should pass value if valid', () => {
    const action = actionPending('ACTION');

    expect(action).toEqual(`ACTION_${PROMISE_PENDING_SUF}`);
  });
});



describe('actionFulfilled', () => {
  it('should pass value if valid', () => {
    const action = actionFulfilled('ACTION');

    expect(action).toEqual(`ACTION_${PROMISE_DONE_SUF}`);
  });
});
