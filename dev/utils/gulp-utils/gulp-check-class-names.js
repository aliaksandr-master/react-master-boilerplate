/* eslint-env node */

const path = require('path');
const fs = require('fs');
const through = require('through2');
const chalk = require('chalk');
const gutil = require('gulp-util');
const uniq = require('lodash/uniq');
const groupBy = require('lodash/groupBy');
const difference = require('lodash/difference');



const PLUGIN_NAME = 'gulp-check-class-names';

const find = (content, regExp) => {
  const classes = [];

  content.replace(regExp, ($0, $1) => {
    classes.push($1);
  });

  return uniq(classes);
};

const hasComponentClass = (componentName) => (className) => {
  return new RegExp(`^${componentName}$`).test(className) || new RegExp(`^${componentName}__`).test(className) || new RegExp(`^${componentName}--`).test(className);
};

const hasElement = () => (className) => /__/.test(className);
const hasModifier = () => (className) => /--/.test(className);

const OR = (...args) => (value) => args.some((checker) => checker(value));

const formatClassNameList = (classes) => `["${classes.map((className) => chalk.yellow(className)).join('", "')}"]`;

const rules = {
  'no-unused-class-in-styles': ({ componentName, lessClasses, jsClasses }) => {
    lessClasses = lessClasses.filter(hasComponentClass(componentName));
    jsClasses = jsClasses.filter(hasComponentClass(componentName));

    const unusedClasses = difference(lessClasses, jsClasses);

    if (!unusedClasses.length) {
      return null;
    }

    return `there are unused classes (in less file) ${formatClassNameList(unusedClasses)}. looks like you define in styles unused className`;
  },
  'no-unused-class-in-view': ({ componentName, lessClasses, jsClasses }) => {
    jsClasses = jsClasses.filter(hasComponentClass(componentName)).filter(OR(hasElement(), hasModifier()));

    lessClasses = lessClasses.filter(hasComponentClass(componentName));
    jsClasses = jsClasses.filter(hasComponentClass(componentName));

    const unusedClasses = difference(jsClasses, lessClasses);

    if (!unusedClasses.length) {
      return null;
    }

    return `there are unused classes (in js file) ${formatClassNameList(unusedClasses)}. looks like you use redundant classNames in template`;
  },
  'no-unused-gen-class-in-styles': ({ componentName, lessGenClasses, jsGenClasses }) => {
    lessGenClasses = lessGenClasses.filter(hasComponentClass(componentName));
    jsGenClasses = jsGenClasses.filter(hasComponentClass(componentName));

    const lessGenBaseClasses = uniq(lessGenClasses.map((className) => className.replace(/--gen-.+/, '')));
    const jsGenBaseClasses = uniq(jsGenClasses.map((className) => className.replace(/--gen-.+/, '')));

    const unusedClasses = difference(lessGenBaseClasses, jsGenBaseClasses);

    if (!unusedClasses.length) {
      return null;
    }

    return `there are unused gen classes (in less file) ${formatClassNameList(unusedClasses.map((cl) => `${cl}--gen-*`))}`;
  },
  'no-unused-gen-class-in-js': ({ componentName, lessGenClasses, jsGenClasses }) => {
    lessGenClasses = lessGenClasses.filter(hasComponentClass(componentName));
    jsGenClasses = jsGenClasses.filter(hasComponentClass(componentName));

    const lessGenBaseClasses = uniq(lessGenClasses.map((className) => className.replace(/--gen-.+/, '')));
    const jsGenBaseClasses = uniq(jsGenClasses.map((className) => className.replace(/--gen-.+/, '')));

    const unusedClasses = difference(jsGenBaseClasses, lessGenBaseClasses);

    if (!unusedClasses.length) {
      return null;
    }

    return `there are unused gen classes (in js file) ${formatClassNameList(unusedClasses.map((cl) => `${cl}--gen-*`))}`;
  },
  'no-invalid-component-name-in-classes-js': ({ componentName, jsClasses, jsGenClasses }) => {
    jsClasses = jsClasses.filter(OR(hasElement(), hasModifier()));

    const validClasses = jsClasses.filter(hasComponentClass(componentName));
    const validGenClasses = jsGenClasses.filter(hasComponentClass(componentName));

    if (validClasses.length === jsClasses.length && validGenClasses.length === jsGenClasses.length) {
      return null;
    }

    const invalidClassNames = difference(jsClasses, validClasses).concat(difference(jsGenClasses, validClasses));

    return `there are invalid class names (in js file) ${formatClassNameList(invalidClassNames)}. it is not match to componentName "${chalk.red(componentName)}"`;
  },
  'no-invalid-component-name-in-classes-styles': ({ componentName, lessClasses }) => {
    const validClasses = lessClasses.filter(hasComponentClass(componentName));

    if (validClasses.length === lessClasses.length) {
      return null;
    }

    const invalidClassNames = difference(lessClasses, validClasses);

    return `there are invalid class names (in less file) ${formatClassNameList(invalidClassNames)}. it is not match to componentName "${componentName}"`;
  }
};

const applyRule = (ruleName, props) => {
  if (!rules.hasOwnProperty(ruleName)) {
    throw new Error(`undefined rule "${ruleName}"`);
  }

  return rules[ruleName](props);
};

const defaultValues = Object.keys(rules).reduce((defaultValues, ruleName) => {
  defaultValues[ruleName] = true;

  return defaultValues;
}, {});

const defaultReporter = (file, errors) => {
  const errorMessages = errors.map(({ rule, error }) => `${chalk.gray(rule)} ${error}`);

  return `file ${chalk.cyan(file.relative)} has ${chalk.red(`${errors.length} errors`)}:\n${errorMessages.map((msg) => `   ${msg}`).join('\n')}`;
};

const defaultGetComponentFile = (filePath) => {
  const dir = path.dirname(filePath);
  const componentName = path.basename(dir);

  return path.join(dir, `${componentName}.view.js`);
};

const defaultGetComponentName = (filePath) => {
  const dir = path.dirname(filePath);

  return path.basename(dir);
};

module.exports = ({ rules = {}, reporter = defaultReporter, getComponentFile = defaultGetComponentFile, getComponentName = defaultGetComponentName } = {}) => {
  rules = Object.assign({}, defaultValues, rules);

  const rulesKeys = Object.keys(rules).filter((ruleName) => rules[ruleName]);

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    if (!/\.view\.less/.test(file.path)) {
      callback(null, file);
      return;
    }

    const componentName = getComponentName(file.path);
    const componentViewJsFilePath = getComponentFile(file.path);

    if (fs.existsSync(componentViewJsFilePath)) {
      const lessContent = file.contents.toString();
      const jsContent = fs.readFileSync(componentViewJsFilePath, 'utf8');

      const lessClasses = find(lessContent, /\.((?:[A-Z][a-zA-Z\d]+)(?:__[a-z\d][a-zA-Z\d]*)?(?:--[a-z\d][a-zA-Z\d]*)?)/g);
      const lessGenClasses = find(lessContent, /\.((?:[A-Z][a-zA-Z\d]+)(?:__[a-z\d][a-zA-Z\d]*)?(?:--gen-[a-z\d][a-zA-Z\d]*))/g);
      const jsClasses = find(jsContent, /['"\s]((?:[A-Z][a-zA-Z\d]+)(?:__[a-z\d][a-zA-Z\d]*)?(?:--[a-z\d][a-zA-Z\d]*)?)/g);
      const jsGenClasses = find(jsContent, /((?:[A-Z][a-zA-Z\d]+)(?:__[a-z\d][a-zA-Z\d]*)?--gen-)/g);

      // gulp-check-class-names: disable rule-name
      // gulp-check-class-names: exclude rule-name: ["some", "param"]

      const flagRE = /\/\/\s*gulp-check-class-names\s*:\s*((?:disable|exclude)\s+[a-z-]+(?::[^\n]+)?)/g;

      const parseFlag = (flagString) => {
        const flag = {};

        flagString.replace(/(disable|exclude)\s+([a-z-]+)(?::([^\n]+))?/g, ($0, action, ruleName, params) => {
          Object.assign(flag, { action, ruleName, params: params ? JSON.parse(params) : null });
        });

        return flag;
      };

      const flags = find(lessContent, flagRE).concat(find(jsContent, flagRE)).map(parseFlag);

      const flagsByRule = groupBy(flags, 'ruleName');

      const errors = rulesKeys.reduce((errors, ruleName) => {
        const ruleFlags = flagsByRule[ruleName] || [];

        if (ruleFlags.find(({ action }) => action === 'disabled')) {
          return errors;
        }

        const excludeFlag = ruleFlags.filter(({ action }) => action === 'exclude').map(({ params }) => params).reduce((allParams, param) => {
          if (param !== null) {
            return allParams.concat(param);
          }

          return allParams;
        }, []);

        const error = applyRule(ruleName, {
          componentName,
          lessClasses: lessClasses.filter((className) => !excludeFlag.includes(className)),
          lessGenClasses,
          jsClasses: jsClasses.filter((className) => !excludeFlag.includes(className)),
          jsGenClasses
        });

        if (error == null) {
          return errors;
        }

        errors.push({ rule: ruleName, error });

        return errors;
      }, []);

      if (errors.length) {
        file[PLUGIN_NAME] = errors;
        const errMsg = reporter(file, errors);

        console.log(`${errMsg}\n`); // eslint-disable-line no-console
        //callback(`\n\n${errMsg}\n\n`, file);
        //return;
      }
    }

    callback(null, file);
  }, (callback) => {
    callback();
  });
};



const handleCallback = (callback, value) => (err) => {
  if (err && !(err instanceof gutil.PluginError)) {
    err = new gutil.PluginError(err.plugin || PLUGIN_NAME, err, {
      showStack: (err.showStack !== false)
    });
  }
  callback(err, value);
};

const tryResultAction = (action, result, done) => {
  try {
    if (action.length > 1) {
      // async action
      action(result, done);
    } else {
      // sync action
      action(result);
      done();
    }
  } catch (error) {
    done(!error ? new Error('Unknown Error') : error);
  }
};

module.exports.reporter = () => {
  let hasError = false;
  let errors = 0;

  return through.obj((file, enc, done) => {
    if (file[PLUGIN_NAME]) {
      hasError = true;
      errors++;
    }

    done(null, file);
  }, (done) => {
    tryResultAction(() => {
      if (hasError) {
        throw new gutil.PluginError(PLUGIN_NAME, { name: PLUGIN_NAME, message: chalk.red(`Failed with errors in ${errors} files`) });
      }
    }, 0, handleCallback(done));
  });
};
