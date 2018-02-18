/*global process*/
const ENV = process.env.NODE_ENV; // eslint-disable-line no-process-env

const config = {
  API_URL: '',
  LOGGER: false,
  BASE_URL: '',
  STATIC_URL: '',
  AUTH_TOKEN: '',
  AUTH_TYPE: '',
  INTERCOM_APP_ID: '',
  ...window.CONFIG || {}
};

export { ENV };

export const DB_VERSION = '1.0.0'; // updates only when DB data structures has broken changes

export const API_URL = config.API_URL;

export const LOGGER = config.LOGGER;

export const AUTH_TOKEN = config.AUTH_TOKEN;

export const AUTH_TYPE = config.AUTH_TYPE;

export const STATIC_URL = config.STATIC_URL;

export const BASE_URL = config.BASE_URL;
