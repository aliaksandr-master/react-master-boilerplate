import isString from 'lodash/isString';



export default (name, value) => {
  if (!isString(value)) {
    throw new TypeError(`${name} must be String`);
  }
};
