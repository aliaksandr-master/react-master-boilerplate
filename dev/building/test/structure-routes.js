/*eslint-env node*/

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const check = require('gulp-checker');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



const { CheckError } = check;


module.exports = () =>
  gulp
    .src(fmap(options.DIR_SRC, [
      'routes/*/index.js',
      '!__*__/**/*',
      '!**/*.mock.js'
    ]))
    .pipe(check({
      name: 'Check routes',
      map: (file) => {
        const dir = path.dirname(file.path);
        const name = path.basename(dir);

        return {
          name,
          dir,
          hasTestFile: fs.existsSync(path.join(dir, '__tests__', 'index.test.js'))
        };
      },
      checkers: [
        ({ hasTestFile, fname, dir }) => {
          if (!hasTestFile && fname !== 'resource') {
            return CheckError(`no test file: ${path.join(dir, '__tests__', 'index.test.js')}`);
          }

          return null;
        }
      ]
    }));
