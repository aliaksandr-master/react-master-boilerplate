/* eslint-env node */

const clean = require('../../utils/gulp-utils/clean');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  clean(fmap(options.CWD, [
    '**/*.orig',
    '!node_modules/**/*'
  ]));
