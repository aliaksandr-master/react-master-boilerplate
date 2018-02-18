/*eslint-env browser, jest*/
/* eslint-disable no-console */

const throwIt = (message) => {
  expect(() => {
    throw new Error(message);
  }).not.toThrow();
};

const wrapConsoleMethod = (methodName) => {
  const realMethod = console[methodName];

  console[methodName] = (...args) => {
    const firstMessage = args[0];

    if (/(Invalid prop|Failed propType|Failed prop type)/.test(firstMessage) || /Invalid argument supplied to/.test(firstMessage)) {
      throw new Error(firstMessage);
    }

    if (/ERROR: /.test(firstMessage)) {
      throwIt(firstMessage);
    }

    if (/FractalField DEPRECATION:/.test(firstMessage)) {
      throwIt(firstMessage);
    }

    if (/Warning:/.test(firstMessage)) {
      throwIt(firstMessage);
    }

    if (/Unknown props/.test(firstMessage) && /Remove these props from the element/.test(firstMessage)) {
      throwIt(firstMessage);
    }

    if (/Accessing PropTypes via the main React package is deprecated/.test(firstMessage)) { // TODO: remove this when all packages will be updated
      return undefined;
    }

    if (/A Component: React\.createClass is deprecated/.test(firstMessage)) { // TODO: remove this when all packages will be updated
      return undefined;
    }

    if (/validateDOMNesting/.test(firstMessage)) { // TODO: remove this when all packages will be updated
      return undefined;
    }

    return realMethod(...args);
  };
};

wrapConsoleMethod('warn');
wrapConsoleMethod('error');
