/* eslint-env node, jest, browser*/
const chalk = require('chalk');



process.on('unhandledRejection', (reason) => {
  console.log(chalk.red(`${reason}\n${reason && reason.stack}`)); // eslint-disable-line no-console

  //throw reason;
});

process.setMaxListeners(9999999);
