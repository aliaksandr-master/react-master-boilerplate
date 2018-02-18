/*eslint-env node*/

const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');



module.exports = (files) => {
  files = Array.isArray(files) ? files : [ files ];

  return gulp.src(files, { read: false }).pipe(vinylPaths(del));
};
