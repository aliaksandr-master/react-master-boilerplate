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
      'resources/*/*/*.js',
      '!resources/api/login/post.js', // TODO: add test for this resource
      '!__*__/**/*',
      '!**/*.mock.js'
    ]))
    .pipe(check({
      name: 'Check resources',
      map: (file) => {
        const dir = path.dirname(file.path);
        const fname = path.basename(file.path).replace(/\.js$/, '');
        const name = `${path.basename(path.dirname(dir))}/${path.basename(dir)}/${fname}`;

        return {
          name,
          dir,
          fname,
          hasTestFile: fs.existsSync(path.join(dir, '__tests__', `${fname}.test.js`))
        };
      },
      checkers: [
        ({ fname }) => {
          if (!/^[a-z0-9]+?[a-z0-9-]+?[a-z0-9]+$/.test(fname)) {
            return CheckError('invalid name format');
          }

          return null;
        }/*,
        ({ hasTestFile, fname, dir }) => {
          if (!hasTestFile && fname !== 'resource') {
            return CheckError(`no test file: ${path.join(dir, '__tests__', `${fname}.test.js`)}`);
          }

          return null;
        }*/
      ]
    }));
