import isRegExp from 'lodash/isRegExp';



export default (name, value) => {
  if (!isRegExp(value)) {
    throw new TypeError(`${name} must be regExp`);
  }
};
