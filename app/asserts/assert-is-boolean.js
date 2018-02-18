import isBoolean from 'lodash/isBoolean';



export default (name, value) => {
  if (!isBoolean(value)) {
    throw new TypeError(`${name} must be Boolean`);
  }
};
