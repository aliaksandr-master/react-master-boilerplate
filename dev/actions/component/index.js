/* eslint-env node */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const uniq = require('lodash/uniq');
const startsWith = require('lodash/startsWith');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const BaseGenerator = require('../index');



const ACTION_CREATE = 'create';
const ACTION_MOVE = 'move';
const ACTION_SMARTIFY = 'smartify';
const ACTION_RENAME = 'rename';


const FEATURES = {
  STORE: 'Store',
  FORM: 'Form',
  SANDBOX: 'Sandbox',
  THEME: 'Theme'
};

const FEATURES_CHOICES = [
  FEATURES.THEME,
  FEATURES.STORE/*,
  FEATURES.FORM,
  FEATURES.SANDBOX*/
];


const weights = {
  'ui': 2,
  'modal': 1
};

const placementPrefixes = {
  'ui': ''
};


const calcPrefixForPlacement = (placement) =>
  placementPrefixes.hasOwnProperty(placement) ? placementPrefixes[placement] : upperFirst(camelCase(placement));


const sortByWeight = (weights) => (dirA, dirB) => {
  if (!weights.hasOwnProperty(dirA) && !weights.hasOwnProperty(dirB)) {
    return 0;
  }

  if (weights.hasOwnProperty(dirA) && !weights.hasOwnProperty(dirB)) {
    return 1;
  }

  if (!weights.hasOwnProperty(dirA) && weights.hasOwnProperty(dirB)) {
    return -1;
  }

  if (weights[dirA] > weights[dirB]) {
    return 1;
  }

  if (weights[dirA] < weights[dirB]) {
    return -1;
  }

  return 0;
};

const calcTypeByAnswers = ({ type, parentPath }) => {
  if (type != null) {
    return type;
  }

  return parentPath.split('/').map((segment) => segment.trim()).filter(Boolean).shift();
};


module.exports = BaseGenerator.extend({

  _NAME: 'component',

  askAction () {
    this.typeAnswers = this._prompt([
      {
        type: 'list',
        name: 'action',
        message: 'action:',
        choices: [
          ACTION_CREATE,
          ACTION_MOVE,
          ACTION_SMARTIFY,
          ACTION_RENAME
        ],
        default: ACTION_CREATE
      }
    ]);
  },



  // SMARTIFY!
  promptsSmartify () {
    if (this.typeAnswers.action !== ACTION_SMARTIFY) {
      return;
    }

    const storeFiles = this._files(`${this._cwd()}/**/*.store.js`);

    this.answers = this._prompt([
      {
        type: 'list',
        name: 'componentPath',
        message: 'component:',
        choices: (_answers) =>
          this
            ._dirs(`${this._cwd()}/**/*`)
            .filter((dir) => /^[A-Z]/.test(path.basename(dir))) // all components
            .filter((dir) => {
              const componentName = path.basename(dir);

              return !storeFiles.includes(`${dir}/${componentName}.store.js`);
            })
            .map((file) => path.relative(this._cwd(), file))
            .sort()
      }
    ]);
  },

  commitSmartify () {
    if (this.typeAnswers.action !== ACTION_SMARTIFY) {
      return;
    }

    const { componentPath } = this.answers;
    const name = path.basename(componentPath);
    const CWD = this._cwdFile(componentPath);

    const templateData = {
      name,
      features: {
        sandbox: Boolean(this._files(`${CWD}/*.sandbox.js`)),
        store: true,
        form: /reduxForm/.test(fs.readFileSync(`${CWD}/${name}.js`, 'utf8'))
      },
      type: {
        modal: componentPath.startsWith('modal/')
      }
    };

    this._copyTplFile('Component.js', `${CWD}/${name}.js`, templateData);
    this._copyTplFile('Component.store.js', `${CWD}/${name}.store.js`, templateData);
    this._copyTplFile('__tests__/Component.store.test.js', `${CWD}/__tests__/${name}.store.test.js`, templateData);
  },



  // RENAME!
  promptsRename () {
    if (this.typeAnswers.action !== ACTION_RENAME) {
      return;
    }

    this.answers = this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter component\'s name:',
        validate: this._validate((name) => {
          this._validateName(name);
          this._validateFirstLetterUpper(name);
          this._validatePascaleFormat(name);
          this._validateFileExists(path.join(this._cwd(), `**/${name}/index.js`));
        })
      },
      {
        type: 'input',
        name: 'newName',
        message: 'new name:',
        validate: this._validate((name) => {
          this._validateName(name);
          this._validatePascaleFormat(name);
          this._validateFileIsNew(path.join(this._cwd(), `**/${name}/index.js`));
          this._validateFileIsNew(path.join(this._cwd(), `**/${name}.js`));
        })
      }
    ]);
  },

  commitRename () {
    if (this.typeAnswers.action !== ACTION_RENAME) {
      return;
    }

    const { name, newName } = this.answers;
    const componentPath = this._files(path.join(this._cwd(), `**/${name}/index.js`)).map((file) => path.relative(this._cwd(), file))[0].replace(/\/index\.js$/, '');
    const oldComponentName = path.basename(componentPath);

    this._files(`${this._cwd()}/${componentPath}/**/*`)
      .forEach((file) => {
        const oldFilePath = file;
        const newFilePath = oldFilePath.replace(RegExp(`/${oldComponentName}`, 'g'), `/${newName}`);

        this._processFile(oldFilePath, (content) => content.replace(RegExp(oldComponentName, 'g'), newName));

        this.fs.move(oldFilePath, newFilePath);
      });
  },



  // MOVE
  promptsMove () {
    if (this.typeAnswers.action !== ACTION_MOVE) {
      return;
    }

    this.answers = this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter component\'s name:',
        validate: this._validate((name) => {
          this._validateName(name);
          this._validateFirstLetterUpper(name);
          this._validatePascaleFormat(name);
          this._validateFileExists(path.join(this._cwd(), `**/${name}/index.js`));
        })
      },
      {
        type: 'list',
        name: 'pathTo',
        pageSize: 10,
        message: 'Path to:',
        choices: ({ name }) =>
          this
            ._dirs(`${this._cwd()}/**/*`)
            .filter((dir) => {
              if (/^[A-Z]/.test(path.basename(dir))) { // component
                return true;
              }

              if (dir.replace(this._cwd(), '').replace(/^\//, '').replace(/\/$/, '').split('/').length === 1) {
                return true;
              }

              return false;
            })
            .map((file) => path.relative(this._cwd(), file))
            .filter((dir) => !String(dir).endsWith(`/${name}`) && !String(dir).includes(`/${name}/`))
            .sort()
      }
    ]);
  },

  commitMove () {
    if (this.typeAnswers.action !== ACTION_MOVE) {
      return;
    }

    const { name } = this.answers;
    const pathTo = path.join(this.answers.pathTo, name);
    const componentIndexes = this._files(path.join(this._cwd(), `**/${name}/index.js`)).map((file) => path.relative(this._cwd(), file));
    const pathFrom = componentIndexes[0].replace(/\/index\.js$/, '');
    const absPathFrom = path.join(this._cwd(), pathFrom);
    const absPathTo = path.join(this._cwd(), pathTo);

    this._files(path.join(absPathFrom, '**/*')).forEach((absFilePath) => {
      const newFileAbsPath = absFilePath.replace(absPathFrom, absPathTo);
      const newDirAbsPath = path.dirname(newFileAbsPath);
      const dirAbsPath = path.dirname(absFilePath);

      if (!/\.snap$/.test(absFilePath)) {
        this._processFile(absFilePath, (content) => {
          const changeRelPath = (relImportPath) => {
            if (!/^\.\.\//.test(relImportPath)) {
              return relImportPath;
            }

            return path.relative(newDirAbsPath, path.resolve(dirAbsPath, relImportPath));
          };

          if (/\.js$/.test(absFilePath)) {
            content = content.replace(/(import\s+.+?from\s+')([^']+)('\s*;)/g, ($0, $1, relImportPath, $3) => `${$1}${changeRelPath(relImportPath)}${$3}`);
            content = content.replace(/(import\s+')([^']+)('\s*;)/g, ($0, $1, relImportPath, $3) => `${$1}${changeRelPath(relImportPath)}${$3}`);
          }

          if (/\.less$/.test(absFilePath)) {
            content = content.replace(/(@import\s+')([^']+)('\s*;)/g, ($0, $1, relImportPath, $3) => `${$1}${changeRelPath(relImportPath)}${$3}`);
          }

          return content;
        });
      }

      this.fs.move(absFilePath, newFileAbsPath);
    });
  },



  // CREATE
  promptsCreate () {
    if (this.typeAnswers.action !== ACTION_CREATE) {
      return;
    }
    this.answers = this._prompt([
      {
        type: 'confirm',
        message: 'is it sub-component?',
        default: false,
        name: 'subcomponent'
      },
      {
        type: 'input',
        name: 'parentPath',
        message: 'parent component (enter component\'s name or leave empty for select manually):',
        when: ({ subcomponent }) => Boolean(subcomponent),
        validate: this._validate((name) => {
          if (!name) {
            return;
          }

          this._validateFileExists(path.join(this._cwd(), `**/${name}/index.js`));
        }),
        filter: (name) => {
          if (!name) {
            return name;
          }

          const componentIndexes = this
            ._files(path.join(this._cwd(), `**/${name}/index.js`))
            .map((file) => path.relative(this._cwd(), file));

          return componentIndexes[0].replace(/\/index\.js$/, '');
        }
      },
      {
        type: 'list',
        name: 'type',
        when: ({ subcomponent, parentPath }) => !subcomponent || !parentPath,
        message: 'type:',
        choices: () => this
          ._dirs(`${this._cwd()}/*`)
          .map((file) => path.basename(file))
          .sort()
          .sort(sortByWeight(weights))
          .reverse()
      },
      {
        type: 'list',
        name: 'parentPath',
        pageSize: 10,
        message: 'parent component',
        when: ({ subcomponent, parentPath }) => Boolean(subcomponent) && !parentPath,
        choices: (answers) =>
          this
            ._dirs(`${this._cwd()}/${answers.type}/**/*`)
            .filter((dir) => /^[A-Z]/.test(path.basename(dir)))
            .map((file) => path.relative(this._cwd(), file))
            .sort()
      },
      {
        type: 'input',
        name: 'name',
        message: (answers) => {
          const prefix = answers.subcomponent ? path.basename(answers.parentPath) : calcPrefixForPlacement(answers.type);

          return `name ${prefix ? `(with prefix "${chalk.green(prefix)}")` : ''}:`;
        },
        validate: this._validate((name, answers) => {
          const type = calcTypeByAnswers(answers);

          this._validateName(name);
          this._validatePascaleFormat(name);
          this._validateFirstLetterUpper(name);
          this._validateFileIsNew(path.join(this._cwd(), `**/${name}/index.js`));

          const pref = answers.subcomponent ? path.basename(answers.parentPath) : calcPrefixForPlacement(type);

          if (pref && !startsWith(name, pref)) {
            throw new Error(`name must contains prefix "${pref}"`);
          }
        })
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'select features:',
        choices: () => FEATURES_CHOICES,
        default: (answers) => {
          let features = FEATURES_CHOICES.filter((feature) => ![ FEATURES.FORM ].includes(feature));
          const type = calcTypeByAnswers(answers);

          if (answers.subcomponent) {
            features = features.filter((feature) => ![ FEATURES.THEME, FEATURES.STORE ].includes(feature));
          }

          //if (/Form$/.test(answers.name)) {
          //  features = [ ...features, FEATURES.FORM ];
          //}

          if (type !== 'page') {
            features = features.filter((feature) => ![ FEATURES.STORE ].includes(feature));
          } else {
            features = features.filter((feature) => ![ FEATURES.THEME ].includes(feature));
          }

          return uniq(features);
        }
      }
    ], (answers) => {
      answers.type = calcTypeByAnswers(answers);

      if (answers.parentPath) {
        answers.parentPath = answers.parentPath.replace(new RegExp(`^${answers.type}/`), '');
      }

      Object.assign(this.answers, answers);
    });
  },

  commitCreate () {
    if (this.typeAnswers.action !== ACTION_CREATE) {
      return;
    }

    const { type, name, parentPath } = this.answers;
    let { features } = this.answers;

    features = [ ...features, FEATURES.SANDBOX ]; // sandbox is permanently enabled

    const CWD = this._cwdFile(`${type}${parentPath ? `/${parentPath}` : ''}/${name}`);

    const templateData = {
      name,
      features: {
        sandbox: features.includes(FEATURES.SANDBOX),
        theme: features.includes(FEATURES.THEME),
        store: features.includes(FEATURES.STORE),
        form: features.includes(FEATURES.FORM)
      },
      type: {
        modal: type === 'modal' && !parentPath
      }
    };

    this._copyTplFile('Component.js', `${CWD}/${name}.js`, templateData);
    this._copyTplFile('Component.view.js', `${CWD}/${name}.view.js`, templateData);
    this._copyTplFile('Component.view.less', `${CWD}/${name}.view.less`, templateData);

    if (templateData.features.store) {
      this._copyTplFile('Component.store.js', `${CWD}/${name}.store.js`, templateData);
      this._copyTplFile('__tests__/Component.store.test.js', `${CWD}/__tests__/${name}.store.test.js`, templateData);
    }

    this._copyTplFile('index.js', `${CWD}/index.js`, templateData);
    this._copyTplFile('Component.const.js', `${CWD}/${name}.const.js`, templateData);

    if (templateData.features.sandbox) {
      this._copyTplFile('Component.sandbox.js', `${CWD}/${name}.sandbox.js`, templateData);
      this._copyTplFile('__tests__/Component.sandbox.test.js', `${CWD}/__tests__/${name}.sandbox.test.js`, templateData);
    } else {
      this._copyTplFile('__tests__/Component.test.js', `${CWD}/__tests__/${name}.test.js`, templateData);
    }
  },

  inTheEnd () {
    //this._writeFiles(() => {
    //  this._openInEditor(`${CWD}/${name}.jsx`);
    //});
  }
});
