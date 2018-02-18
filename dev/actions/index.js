/* eslint-env node */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const _ = require('lodash'); // eslint-disable-line lodash/import-scope
const BaseGenerator = require('yeoman-generator');
const camelCase = require('lodash/camelCase');
const startsWith = require('lodash/startsWith');
const kebabCase = require('lodash/kebabCase');
const once = require('lodash/once');
const without = require('lodash/without');
const isUndefined = require('lodash/isUndefined');
const glob = require('glob');
const chalk = require('chalk');
const options = require('../config');



const config = options.PACKAGE.generatorsConfig;


let editor = null;
const initEditor = once(() => {
  const hasIdeaDir = fs.existsSync(path.resolve(__dirname, '../../.idea'));

  if (!hasIdeaDir) {
    return;
  }

  editor = {
    open: (file) => {
      const command = 'curl';
      const args = [ `http://localhost:${options.WEBSTORM_OPEN_FILE_PORT}/?message=/${path.relative(options.CWD, file)}` ];

      childProcess.spawn(command, args, { detached: true, timeout: 1000 });
    }
  };
});



module.exports = BaseGenerator.extend({
  _NAME: '',

  genConfig () {
    return config[this._NAME];
  },

  _openInEditor (path/*, row = 1, column = 1*/) {
    initEditor();

    if (editor) {
      editor.open(`${path}`);
    }
  },

  prompts () {
    const dirs = this._dirs(path.join(__dirname, '*'))
      .map((file) => path.basename(file))
      .sort()
      .sort((nameA, nameB) => {
        if (nameA === 'component') {
          return -1;
        }
        if (nameB === 'component') {
          return 1;
        }

        return 0;
      });

    if (!dirs.length) {
      return;
    }

    if (dirs.length === 1) {
      this.composeWith(path.resolve(__dirname, dirs[0]));
      return;
    }

    this._prompt([
      {
        type: 'list',
        name: 'generator',
        message: 'what do you want to do?:',
        choices: dirs
      }
    ], (props) => {
      this.composeWith(path.resolve(__dirname, props.generator));
    });
  },

  _dirs (globTpl) {
    const onlyFiles = this._files(globTpl);

    return glob.sync(globTpl).filter((filePath) => !onlyFiles.includes(filePath));
  },

  _namePrefixFilter (name, kebab = true) {
    name = String(name).trim();

    if (kebab) {
      name = kebabCase(name);
    }

    const pref = this.genConfig().prefix;

    if (pref && !startsWith(name, pref)) {
      name = this.genConfig().prefix + name;
    }

    name = name.replace(/-(\d+)/g, '$1'); // for support IDEA angular plugin

    return name;
  },

  _files (globTpl) {
    return glob.sync(globTpl, { nodir: true });
  },

  _filesExpose (globTpl) {
    return this._files(globTpl)
      .map((filename) => ({
        filename,
        content: fs.readFileSync(filename, { ecoding: 'utf8' })
      }));
  },

  _validate (validator) {
    return function (...args) {
      try {
        const result = validator(...args);

        if (result == null || result === true) {
          return true;
        }

        return result;
      } catch (err) {
        return err.message;
      }
    };
  },

  _validateDashFormat (name) {
    if (!/^[a-z][a-z0-9-]*?[^-]?$/.test(name)) {
      throw new Error('invalid format. must matched with expression regExp /^[a-z][a-z0-9-]*?[^-]?$/');
    }
  },

  _validateCamelFormat (name) {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
      throw new Error('invalid format. must be in camelCase. must matched with expression regExp /^[a-zA-Z][a-zA-Z0-9]*$/');
    }
  },

  _validatePascaleFormat (name) {
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      throw new Error('invalid format. must be in PascalCase. must matched with expression regExp /^[A-Z][a-zA-Z0-9]*$/');
    }
  },

  _validateFirstLetterUpper (name) {
    if (!/^[A-Z]/.test(name)) {
      throw new Error('invalid format. first letter must be in UpperCase');
    }
  },

  _validateFirstLetterLower (name) {
    if (!/^[a-z]/.test(name)) {
      throw new Error('invalid format. first letter must be in LowerCase');
    }
  },

  _validateName (name) {
    if (!name && !name.length) {
      throw new Error('invalid format. name must be not empty');
    }

    if (name !== name.trim()) {
      throw new Error('invalid format. spaces is not allowed');
    }
  },

  _validateFileIsNew (template) {
    const files = glob.sync(template);

    if (files.length) {
      throw new Error(`files [${files.map((file) => chalk.red(path.relative(this._srcDir(), file))).join(', ')}] already exists!`);
    }
  },

  _validateFileExists (template) {
    const files = glob.sync(template);

    if (!files.length) {
      throw new Error(`files [${files.map((file) => chalk.red(path.relative(this._srcDir(), file))).join(', ')}] not exists!`);
    }
  },

  _srcDir () {
    return path.resolve(this.destinationRoot(), 'app');
  },

  _srcFile (file) {
    return path.resolve(this._srcDir(), file);
  },

  _cwd () {
    return path.resolve(this._srcDir(), this.genConfig().cwd || '');
  },

  _cwdFile (file) {
    return path.resolve(this._cwd(), file);
  },

  _prompt (prompts, done) {
    const _done = this.async();
    const answers = {};

    const questionsToFilter = prompts.filter((question) => {
      if (question.type === 'list' && Array.isArray(question.choices) && question.choices.length === 1) {
        let answ = question.default != null ? question.default : question.choices[0];

        if (answ && answ.value) {
          answ = answ.value;
        }

        answers[question.name] = answ;

        return true;
      }

      return false;
    });

    prompts = without(prompts, ...questionsToFilter);

    this.prompt(prompts)
      .then((props) => {
        if (done) {
          done(props);
        } else {
          Object.assign(answers, props);
        }

        _done();

        return answers;
      }).catch(() => {});

    return answers;
  },

  _processFile (filePath, processMethod) {
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });

    content = processMethod(content);

    if (isUndefined(content)) {
      return;
    }

    this.fs.write(filePath, content);
  },

  _addRelRequire (absFilePathForPatch, requirePath) {
    let content = fs.readFileSync(absFilePathForPatch, { encoding: 'utf-8' });
    let relPath = path.relative(path.dirname(absFilePathForPatch), requirePath);

    if (!/^\.\//.test(relPath)) {
      relPath = `./${relPath}`;
    }

    if (/\.js$/.test(relPath)) {
      relPath = relPath.replace(/\.js$/, '');
    }

    content = content.replace(/([\t ]*)(\/\*generator:require\*\/)/, `$1import '${relPath}';\n$1$2`);

    const mdlName = camelCase(`${path.basename(relPath)}Mdl`);

    content = content.replace(/([\t ]*)(\/\*generator:import\*\/)/, `$1import ${mdlName} from '${relPath}';\n$1$2`);
    content = content.replace(/(\s*)(\/\*generator:module\*\/)/, `,$1${mdlName}$1$2`);

    this.fs.write(absFilePathForPatch, content);
  },

  _copyTplFile (from, absPathTo, data) {
    this.fs.copyTpl(this.templatePath(from), absPathTo, Object.assign({}, data, {
      __CONFIG__: this.genConfig(),
      _,
      _relPath: (pathFromProjectSrcRoot) =>
        path.relative(
          path.dirname(absPathTo),
          path.join(this.destinationRoot(), pathFromProjectSrcRoot)
        )
    }));
  }
});
