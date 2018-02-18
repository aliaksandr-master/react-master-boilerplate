/*eslint-env node*/

const gulpIf = require('gulp-if');
const gulp = require('gulp');
const gulpCheckPackage = require('gulp-check-package');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  gulp
    .src(fmap(options.CWD, 'package.json'))
    .pipe(gulpIf(options.TEST_ONLY_TRACKED, gulpGitStatusFilter({ tracked: true, staged: true })))
    .pipe(gulpCheckPackage())
;
