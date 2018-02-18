/* eslint-env node */

const clean = require('../../utils/gulp-utils/clean');
const options = require('../../config');



module.exports = () =>
  clean([ options.DIR_ESLINT_CACHE ]);
