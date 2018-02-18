/* eslint-env node */

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpEslint = require('gulp-eslint');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



module.exports = () =>
  gulp
    .src(fmap(options.DIR_SRC, [
      '**/*.{js,jsx}',
      '!**/*scsslint*',
      '!**/*.test.js',
      '!**/__mocks__/**/*',
      '!**/*.sandbox.js',
      '!vendor/**/lib/**/*'
    ]))
    .pipe(gulpIf(options.TEST_ONLY_TRACKED, gulpGitStatusFilter({ tracked: true, staged: true })))
    .pipe(gulpEslint({ configFile: options.ESLINT_CONFIG_FILE, cacheLocation: options.ESLINT_CACHE_FILE }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
;
