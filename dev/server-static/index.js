/*eslint-env node*/

const express = require('express');
const options = require('../config');



const app = express();



app.get('*', express.static(`${options.CWD}/${options.DIR_SRC}`));



module.exports = app;
