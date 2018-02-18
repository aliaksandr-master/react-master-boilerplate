/* eslint-env node */

const path = require('path');
const camelCase = require('lodash/camelCase');
const BaseGenerator = require('../index');



const ACTION_CREATE = 'create';


const getTestFileBySource = (src) => {
  const extname = path.extname(src);

  return path.join(path.dirname(src), `__tests__/${path.basename(src, extname)}.test.js`);
};

module.exports = BaseGenerator.extend({

  _NAME: 'test',

  askAction () {
    this.typeAnswers = this._prompt([
      {
        type: 'list',
        name: 'action',
        message: 'action:',
        choices: [
          ACTION_CREATE
        ],
        default: ACTION_CREATE
      }
    ]);
  },

  promptAdd () {
    if (this.typeAnswers.action !== ACTION_CREATE) {
      return;
    }

    const allJsFiles = this._files(`${this._cwd()}/**/*.js`)
      .filter((file) => !/(sandbox|\/vendor\/index.js|\/app\/config\/|\/app\/components\/)/i.test(file));

    const testFiles = allJsFiles
      .filter((file) => /__tests__/.test(file));

    const notTestedFiles = allJsFiles
      .filter((file) => !/__tests__/.test(file))
      .filter((file) => !testFiles.includes(getTestFileBySource(file)));

    this.answers = this._prompt([
      {
        type: 'list',
        name: 'script',
        message: 'script file for testing:',
        choices: notTestedFiles
          .filter((file) => !/(__tests__|Sandbox|\.sandbox\.js|\/components\/)/.test(file))
          .map((file) => path.relative(this._cwd(), file))
          .sort()
      }
    ]);
  },

  commitAdd () {
    if (this.typeAnswers.action !== ACTION_CREATE) {
      return;
    }

    const { script } = this.answers;
    const extname = path.extname(script);
    const filenameWithoutExt = path.basename(script, extname);

    this._copyTplFile('__tests__/some.test.js', path.resolve(this._cwd(), getTestFileBySource(script)), {
      filename: filenameWithoutExt,
      filenameCamelCase: camelCase(filenameWithoutExt)
    });
  }
});
