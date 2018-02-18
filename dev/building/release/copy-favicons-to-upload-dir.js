/*eslint-env node*/

const gulp = require('gulp');
const print = require('../../gulp-tasks/gulp-print-files-count');
const options = require('../../config');
const fmap = require('../../utils/gulp-utils/fmap');



module.exports = () =>
  gulp
    .src(fmap(options.DIR_SRC, [ 'images/favicon/*.{png,svg,ico}' ]), { base: options.DIR_SRC })
    .pipe(print('copy-favicons-to-upload-dir'))
    .pipe(gulp.dest(options.DIR_RELEASE));
