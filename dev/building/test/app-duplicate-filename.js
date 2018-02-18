/* eslint-env node */

const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const groupBy = require('lodash/groupBy');
const options = require('../../config');



module.exports = (callback) => {
  const DIR = `${options.CWD}/${options.DIR_SRC}`;
  const allFilesInProject = glob.sync(`${DIR}/**/*`, { nodir: true });

  const namesFiltered = allFilesInProject
    .filter((filename) => ![ 'index.js', 'index.less', 'index.html' ].includes(path.basename(filename)))
    .filter((filename) => ![ 'config' ].includes(path.basename(path.dirname(filename))))
    .filter((filename) => !/__examples__/.test(filename) && !/__tests__/.test(filename) && !/__responses__/.test(filename))
    .filter((filename) => !/\/vendor\//.test(filename) && !/\/images\//.test(filename))
    .filter((filename) => !/\/resources\/[^/]+\/[^/]+\/[^/]+?.js/.test(filename) && !/\/resources\/[^/]+\/origin.js/.test(filename))
    .map((filename) => ({ key: path.basename(filename), filename }));

  const groups = groupBy(namesFiltered, 'key');

  const wrongGroups = Object.keys(groups).filter((group) => groups[group].length > 1);

  if (!wrongGroups.length) {
    callback();
    return;
  }

  callback(`${chalk.red('duplicate basenames of files')} [\n  ${wrongGroups.map((name) => groups[name].map(({ filename }) => path.relative(DIR, filename).replace(/(\/[^/]+)$/, chalk.red('$1'))).join(',\n  ')).join(',\n  ')}\n]`);
};
