/* eslint-env node */

const through = require('through2');
const gutil = require('gulp-util');



module.exports = () =>
  through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    const content = file.contents.toString('utf8');

    const allMatchers = [];

    content.replace(/.&./g, ($0) => {
      allMatchers.push($0);
    });

    const errorStrings = allMatchers
      .map((match) => {
        if (/&[ {:.,]/.test(match)) {
          return null;
        }

        return `invalid & usage "${match}"`;
      })
      .filter(Boolean);

    if (errorStrings.length) {
      callback(new gutil.PluginError('gulp-style-lint', `${errorStrings.join('\n')}\n in file "${file.relative}"`), file);
      return;
    }

    callback(null, file);
  });
