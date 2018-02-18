import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';



export default (value) => {
  if (isNumber(value)) {
    return !isNaN(value);
  }

  if (isString(value)) {
    return /^-?\d+([.]\d*)?$/.test(value);
  }

  return false;
};
