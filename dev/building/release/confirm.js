/*eslint-env node*/

const inquirer = require('inquirer');
const gutil = require('gulp-util');
const options = require('../../config');
const environments = require('../../target.json');



module.exports = (callback) => {
  gutil.log('ENVIRONMENT: ', gutil.colors.red(options.ENV));

  if (options.ENV !== environments.PROD) {
    callback();
    return;
  }

  if (options.FORCE_RELEASE) {
    callback();
    return;
  }

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: 'Are you sure?',
        default: false
      }
    ])
    .then((answers) => {
      callback(answers.confirmed ? null : new Error(`unconfirmed ${options.ENV} release`));
      return null;
    })
    .catch(() => {});
};
