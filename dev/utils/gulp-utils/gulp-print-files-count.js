/*eslint-env node*/

const through = require('through2');
const gutil = require('gulp-util');
const chalk = require('chalk');



module.exports = (title) => {
  let filesCount = 0;

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    filesCount++;

    callback(null, file);
  }, (callback) => {
    gutil.log(`${title ? chalk.yellow(`[${title}] `) : ''}processed ${chalk.yellow(filesCount)} files`);

    callback();
  });
};
