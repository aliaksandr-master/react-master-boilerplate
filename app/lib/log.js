/* eslint-disable no-console */
/* global console */



const error = (...error) => {
  if (window.console && console.error) {
    window.console.error(...error);
  }
};



export const logError = (err/*, { cause = null, tags } = {}*/) => {
  error(err);

  // hiddenError(err, cause, tags);
};



export const logWarn = (warnMessage/*, { cause = null, tags } = {}*/) => {
  if (window.console && console.warn) {
    window.console.warn(warnMessage);
  }
};



export const logInfo = (...args) => {
  if (__ASSERTS_ENABLED__ && window.console && console.info) {
    console.info(...args);
  }
};


export const throwHiddenError = (message, params = {}) => {
  if (__ASSERTS_ENABLED__) {
    error('ERROR:', message);
    throw new Error(message);
  } else {
    logError(message, params);
  }
};


export const logUnhandledCatch = (params) => (error) => {
  throwHiddenError(error.message, params);
};


export const showNotImplementedNotice = (...messages) => {
  logInfo('[NOT_IMPLEMENTED]', ...messages);
};
