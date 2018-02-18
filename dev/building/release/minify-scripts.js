/* eslint-env node */

const gulp = require('gulp');
const optimizejs = require('gulp-optimize-js');
const gulpUglify = require('gulp-uglify');
//const gulpPrepack = require('gulp-prepack');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  gulp.src(fmap(options.DIR_RELEASE, [ '**/*.js' ]), { base: options.DIR_RELEASE })
    .pipe(gulpUglify({
      sourceMap: false,
      mangle: {
        toplevel: true
      },
      toplevel: true,
      ie8: false,
      compress: {
        passes: 2,
        unused: true,
        warnings: false,
        dead_code: true,
        drop_debugger: true,
        //keep_fnames: true,
        keep_fnames: false,
        keep_infinity: true
      },
      output: {
        //bracketize: false,
        beautify: false,
        comments: false
      }
    }).on('error', (...args) => console.log(...args))) // eslint-disable-line no-console
    //.pipe(gulpPrepack()) // TODO: enable prepack!
    .pipe(optimizejs())
    .pipe(gulp.dest(options.DIR_RELEASE));
