/*eslint-env node*/

const gulp = require('gulp');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const gulpIf = require('gulp-if');
const gulpStylelint = require('gulp-stylelint');
const fmap = require('../../utils/gulp-utils/fmap');
const gulpStyleLinter = require('../../utils/gulp-utils/gulp-style-lint');
const gulpCheckClassNames = require('../../utils/gulp-utils/gulp-check-class-names');
const options = require('../../config');



module.exports = () =>
  gulp
    .src(fmap(options.DIR_SRC, [
      '**/*.less',
      '!**/*scsslint*'
    ]))

    .pipe(gulpIf(options.TEST_ONLY_TRACKED, gulpGitStatusFilter({ tracked: true, staged: true })))

    .pipe(gulpStyleLinter())
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))

    .pipe(gulpCheckClassNames({
      rules: {
        'no-unused-class-in-view': false,
        'no-invalid-component-name-in-classes-styles': true
      }
    }))
    .pipe(gulpCheckClassNames.reporter());
