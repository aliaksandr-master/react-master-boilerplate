/* eslint-env node */

// const postCssMqPacker = require('css-mqpacker');
const postCssAutoprefixer = require('autoprefixer');
const postCssSlectorNot = require('postcss-selector-not');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');



module.exports = {
  plugins: [
    postCssSlectorNot,
    // postCssMqPacker,
    postCssFlexBugsFixes,
    postCssAutoprefixer({
      browsers: [
        '> 5%',
        'last 2 version',
        'IE >= 9',
        'Android >= 4',
        'Safari >= 5',
        'iOS >= 7'
      ]
    })
  ]
};
