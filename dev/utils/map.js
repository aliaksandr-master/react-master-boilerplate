/*eslint-env node*/
const fs = require('fs');
const sha1 = require('crypto-js/sha1');
const assign = require('lodash/assign');
const memoize = require('lodash/memoize');
const keys = require('lodash/keys');



module.exports = (
  map,
  {
    filter: filterMap = {},
    defaults = {},
    validate: validateMap = {},
    defaultConfigFile = null,
    defaultsIdRequired = true
  }
) => {
  const defConf = defaultConfigFile && fs.existsSync(defaultConfigFile) ? require(defaultConfigFile) : {}; // eslint-disable-line global-require, import/no-dynamic-require

  defaults = assign({}, defaults, defConf);

  const get = memoize((name) => {
    if (defaultsIdRequired && !defaults.hasOwnProperty(name)) {
      throw new Error(`you didn't set default value for argument "${name}"`);
    }

    const value = map.hasOwnProperty(name) ? map[name] : defaults[name];

    const validate = validateMap.hasOwnProperty(name) ? validateMap[name] : () => {};

    validate(value);

    const filter = filterMap.hasOwnProperty(name) ? filterMap[name] : (value) => value;

    return filter(value);
  });

  get.$hash = sha1(keys(defaults).sort().map((key) => get(key)).join('@,@')).toString();

  return get;
};
