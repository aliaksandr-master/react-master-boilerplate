/*eslint-env node*/



const path = require('path');
const glob = require('glob');
const express = require('express');
const options = require('../config');



const app = express();



const DIR = 'components';



app.get(`/${DIR}`, (req, res) => {
  const basePath = `${options.CWD}/${options.DIR_SRC}/${DIR}`;
  const allComponentsWithSandboxFile = glob.sync(`${basePath}/**/*.sandbox.js`, { symlinks: false, nodir: true });

  const filesWithData = allComponentsWithSandboxFile.map((filePath) => {
    const componentName = path.basename(path.dirname(filePath));

    return {
      id: String(componentName),
      dir: path.dirname(path.relative(basePath, filePath)),
      name: componentName
    };
  });

  res.send(filesWithData);
});



module.exports = app;
