/*eslint-env node*/

const lazyTaskBuilder = require('gulp-lazy-init');
const gulp = require('gulp-help')(require('gulp'), {
  description: '',
  hideEmpty: true,
  hideDepsMessage: true
});



const task = lazyTaskBuilder(gulp, __dirname);
const options = require('../config');



gulp.task('default', [
  'help'
]);



gulp.task('cleanup', [
  task('cleanup/orig')
]);



gulp.task('generate', [
  task('generate/mock-update')
]);



gulp.task('clean-cache', [
  task('cleanup/jest-cache'),
  task('cleanup/babel-cache'),
  task('cleanup/eslint-cache')
]);



gulp.task('test-code-style', 'test all systems', [
  task('test/app-scripts'),
  task('test/app-styles'),
  task('test/sys-scripts'),
  task('test/app-duplicate-filename'),
  task('test/package'),
  task('test/structure-filters'),
  task('test/structure-validate'),
  task('test/structure-assert'),
  task('test/structure-resources'),
  task('test/structure-routes'),
  task('test/structure-components')
]);



gulp.task('test', 'test code of the project', [
  'test-code-style'
]);


gulp.task('test-build', 'test bundling the code', task.sequence(
  task('release/clean'),
  task('release/build-bundle')
));



gulp.task('dev', 'dev server. open page in main browser', task.sequence(
  task('test/package'),
  [
    task('dev/server'),
    task('dev/open-browser')
  ]
));


const minifyScripts = task('release/minify-scripts');



gulp.task('deploy', task.sequence(...[
  task('release/clean'),
  task('release/build-bundle'),
  [
    task('release/minify-styles'),
    options.MINIFY ? minifyScripts : null
  ].filter(Boolean),
  task('release/revision'),
  task('release/add-stemp'),
  task('release/copy-favicons-to-upload-dir')
].filter(Boolean)));


gulp.task('release', 'release the project', task.sequence(
  task('release/confirm'),
  'test-code-style',
  'deploy'
), {
  options: {
    'target=prod': 'deploy to PROD server',
    'target=dev': 'deploy to DEV server'
  }
});
