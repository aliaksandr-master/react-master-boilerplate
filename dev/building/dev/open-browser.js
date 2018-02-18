/*eslint-env node*/

const open = require('open');
const options = require('../../config');



module.exports = (callback) => {
  open(options.DEV_URL);

  callback();
};
