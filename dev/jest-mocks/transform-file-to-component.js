/* eslint-env node */

const path = require('path');



const CWD = path.resolve(__dirname, '../../');

module.exports = {
  process (src, filename, _config, _options) {
    return `
const React = require('react');



module.exports = class MockedComponent extends React.Component {
  render () {
    return React.createElement('div', Object.assign({}, this.props, { 'data-filename': ${JSON.stringify(path.relative(CWD, filename))} }), ${JSON.stringify(path.relative(CWD, filename))});
  }
};\n`;
  }
};
