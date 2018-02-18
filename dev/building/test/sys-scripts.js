/*eslint-env node*/

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gulpEslint = require('gulp-eslint');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');



module.exports = () =>
  gulp
    .src([
      '**/*.js',
      `!${options.DIR_SYS}/actions/**/templates/**/*`,
      `!${options.DIR_SRC}/**/*`,
      '!.*/**/*',
      '!node_modules/**/*'
    ])
    .pipe(gulpIf(options.TEST_ONLY_TRACKED, gulpGitStatusFilter({ tracked: true, staged: true })))
    .pipe(gulpEslint({ configFile: options.ESLINT_CONFIG_FILE, cacheLocation: options.ESLINT_CACHE_FILE }))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
