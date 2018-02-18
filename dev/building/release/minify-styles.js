/* eslint-env node */

const gulp = require('gulp');
const gulpCssComb = require('gulp-csscomb');
const gulpCSSO = require('gulp-csso');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  gulp.src(fmap(options.DIR_RELEASE, [ '**/*.css' ]), { base: options.DIR_RELEASE })
    .pipe(gulpCssComb())
    .pipe(gulpCSSO({
      restructure: true,
      sourceMap: false,
      debug: false
    }))
    .pipe(gulp.dest(options.DIR_RELEASE));
