/*eslint-env node*/
const includes = require('lodash/includes');



module.exports = (name, values) => (value) => {
  if (!includes(values, value)) {
    throw new Error(`${name} value is invalid. must be ["${values.join('", "')}"]`);
  }
};
