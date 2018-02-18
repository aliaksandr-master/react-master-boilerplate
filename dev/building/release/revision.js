/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const gulpRev = require('gulp-rev');
const vinylPaths = require('vinyl-paths');
const gulpRename = require('gulp-rename');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  gulp.src(fmap(options.DIR_RELEASE, [ '**/*.{js,css}' ]), { base: options.DIR_RELEASE })
    .pipe(vinylPaths(del))
    .pipe(gulpRev())
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace(/-([^-]+)$/, '.$1'); // for server format

      return path;
    }))
    .pipe(gulp.dest(options.DIR_RELEASE))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest(options.DIR_RELEASE));
