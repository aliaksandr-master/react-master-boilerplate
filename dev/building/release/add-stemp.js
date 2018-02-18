/*eslint-env node*/

const path = require('path');
const gulp = require('gulp');
const gulpStemp = require('gulp-stemp');
const options = require('../../config');
const fmap = require('../../utils/gulp-utils/fmap');



module.exports = () =>
  gulp
    .src(fmap(options.DIR_RELEASE, [ '**/*.js' ]), { base: options.DIR_RELEASE })
    .pipe(gulpStemp({
      stemp: (_filename) => JSON.stringify(options.__APP_STAMP__),
      key: (filename) => `window.__${String(path.basename(filename, path.extname(filename))).replace(/\..+$/, '').toUpperCase().replace(/\W/g, '_')}_STEMP__`
    }))
    .pipe(gulp.dest(options.DIR_RELEASE));
