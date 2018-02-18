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
      'filters/*.js'
    ]))
    .pipe(check({
      name: 'Check filters',
      map: (file) => {
        const dir = path.dirname(file.path);
        const name = path.basename(file.path).replace(/\.js$/, '');

        return {
          name,
          hasTestFile: fs.existsSync(path.join(dir, '__tests__', `${name}.test.js`))
        };
      },
      checkers: [
        ({ name }) => {
          if (!/^[a-z0-9]+[a-z0-9-]+?[a-z0-9]+$/.test(name)) {
            return CheckError('invalid name format');
          }

          return null;
        },
        ({ hasTestFile }) => {
          if (!hasTestFile) {
            return CheckError('no test file');
          }

          return null;
        }
      ]
    }));
