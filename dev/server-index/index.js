/* eslint-env node */

const fs = require('fs');
const path = require('path');
const express = require('express');
const options = require('../config');



const app = express();



app.get(/^\/-(index-[^/]+?)-\/.*/, (req, res) => {
  let fileBaseName = req.params[0];

  if (fileBaseName === 'index-main' && options.ENTRIES && options.ENTRIES.length === 1 && options.ENTRIES[0] === 'index-sandbox') {
    fileBaseName = 'index-sandbox';
  }

  let content = fs.readFileSync(path.resolve(options.CWD, options.DIR_SRC, `${fileBaseName}.html`), 'utf8');

  content = content.replace(/{%\s*config\.([^%]+)\s*%}/g, ($0, $1) => {
    return options[$1.trim()];
  });

  res.send(content);
});



module.exports = app;
