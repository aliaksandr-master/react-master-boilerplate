/*eslint-env node*/


module.exports = (name) => (value) => {
  if (!/^\d+$/.test(String(value))) {
    throw new TypeError(`${name} value must be number`);
  }
};
