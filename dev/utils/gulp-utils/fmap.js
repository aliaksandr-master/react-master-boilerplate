/* eslint-env node */

const map = require('lodash/map');



module.exports = (cwd, files) => {
  files = Array.isArray(files) ? files : [ files ];

  return map(files, (file) => {
    const negative = /^!/.test(file);

    if (negative) {
      file = file.replace(/^!/, '');
    }

    return `${negative ? '!' : ''}${cwd.replace(/\/$/, '/')}/${file.replace(/^\//, '')}`;
  });
};
