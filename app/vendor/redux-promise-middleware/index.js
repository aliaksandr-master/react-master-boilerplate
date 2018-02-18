import promiseMiddleware from './redux-promise-middleware';



const PROMISE_DONE_SUF = '_DONE';
const PROMISE_FAILED_SUF = '_FAILED';
const PROMISE_PENDING_SUF = '_PENDING';



export const actionFulfilled = (action) =>
  `${action}_${PROMISE_DONE_SUF}`;



export const actionRejected = (action) =>
  `${action}_${PROMISE_FAILED_SUF}`;



export const actionPending = (action) =>
  `${action}_${PROMISE_PENDING_SUF}`;



export default () => promiseMiddleware({ promiseTypeSuffixes: [ PROMISE_PENDING_SUF, PROMISE_DONE_SUF, PROMISE_FAILED_SUF ] });
