/* eslint-disable lodash/prefer-lodash-typecheck*/

export default (value) => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
};
