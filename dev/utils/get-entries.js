/*eslint-env node*/

const path = require('path');
const glob = require('glob');
const environments = require('../target.json');



module.exports = (config) =>
  glob.sync(path.join(config.CWD, config.DIR_SRC, 'index-*.js'))
    .map((fullPathToFile) => {
      const name = path.basename(fullPathToFile, path.extname(fullPathToFile));

      return {
        name,
        fileJs: fullPathToFile,
        fileHtml: fullPathToFile.replace(/js$/, 'html')
      };
    })
    .filter(({ name }) =>
      config.ENV !== environments.LOCAL || !config.ENTRIES.length || config.ENTRIES.includes(name)
    );
