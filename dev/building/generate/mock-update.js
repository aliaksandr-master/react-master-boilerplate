/* eslint-env node */

const fs = require('fs');
const path = require('path');
const flatten = require('lodash/flatten');
const unary = require('lodash/unary');
const fse = require('fs-extra');
const glob = require('glob');
const moment = require('moment');
const uniq = require('lodash/uniq');
const chalk = require('chalk');
const fmap = require('../../utils/gulp-utils/fmap');
const options = require('../../config');



const headerParse = (content) => {
  try {
    let paramsString = '';

    content.replace(/^.*?\/\*generated\(([^)]+)\)\*\/\n.+/, ($0, $1) => {
      paramsString = $1;
    });

    if (!paramsString) {
      return null;
    }

    return JSON.parse(paramsString);
  } catch (_err) {
    return null;
  }
};


const template = (content, file, version) => [
  `/*generated(${JSON.stringify({ file, date: moment().format(), version })})*/`,
  `module.exports = ${JSON.stringify(content, null, 2)};\n`
].join('\n');


module.exports = (callback) => {
  const patterns = fmap(path.join(options.CWD, options.DIR_SRC), [ '*/*.mock.js', '**/*.mock.js' ]);

  uniq(flatten(patterns.map(unary(glob.sync.bind(glob)))))
    .sort()
    .filter((file) => !path.basename(file).startsWith('_'))
    .forEach((specFilePath) => {
      const name = path.basename(specFilePath).replace(/.mock\.js$/, '');
      const mockDir = path.join(path.dirname(specFilePath), '__mocks__');
      const relSchemaPath = path.relative(options.CWD, specFilePath);

      delete require.cache[specFilePath]; // eslint-disable-line fp/no-delete

      const mockGen = require(specFilePath); // eslint-disable-line import/no-dynamic-require, global-require
      const version = mockGen.version();

      const skippedFiles = [];
      const createdFiles = [];
      const updatedFiles = [];
      const ignoredFiles = [];

      fse.ensureDirSync(mockDir);

      mockGen.generate(mockGen.limit || 10).forEach((result, index) => {
        const destinationFilePath = path.join(mockDir, `${name}-${index + 1}.js`);
        const exists = fs.existsSync(destinationFilePath);

        if (exists) {
          const params = headerParse(fs.readFileSync(destinationFilePath, 'utf8'));

          if (!params || params.version === version) {
            (!params ? ignoredFiles : skippedFiles).push(destinationFilePath);
            return;
          }
        }

        (exists ? updatedFiles : createdFiles).push(destinationFilePath);

        fs.writeFileSync(destinationFilePath, template(result, relSchemaPath, version), 'utf8');
      });

      const params = [
        `created:${createdFiles.length ? chalk.bgBlue(chalk.black(createdFiles.length)) : chalk.gray(createdFiles.length)}`,
        `updated:${updatedFiles.length ? chalk.bgCyan(chalk.black(updatedFiles.length)) : chalk.gray(updatedFiles.length)}`,
        `fresh:${skippedFiles.length ? skippedFiles.length : chalk.gray(skippedFiles.length)}`,
        `ignored:${chalk.gray(ignoredFiles.length)}`
      ];

      console.log(`[${chalk.blue('mockgen')}] ${chalk.yellow(relSchemaPath)} [${params.join(',')}]`); // eslint-disable-line no-console
    });

  callback();
};
