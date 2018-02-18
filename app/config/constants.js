import uSymbol from 'usymbol';
import { addStrMap } from 'str-map';
import constant from '../lib/const';
import { ENV } from './index';



/* production-ready of feature, key: FEATURE_SLUG_NAME, value: state, TRUE if ready for production */
const PRODUCTION_READY_FEATURE_STATUS = {
  SOME: true
};


export const FEATURE_FLAG = constant('FEATURE_FLAG', Object.entries(PRODUCTION_READY_FEATURE_STATUS).reduce((flags, [ feature, status ]) => ({
  ...flags,
  [feature]: status || ENV !== 'production' || /localhost:/.test(window.location.href)
}), {}), { uniq: false });



export const SORT_ORDER = constant('SORT_ORDER', {
  SMALL_TO_BIG: 'ASC',
  BIG_TO_SMALL: 'DESC'
});

export const RESPONSE_STATE = constant('RESPONSE_STATE', {
  FAILED: uSymbol('FAILED', 'RESPONSE_STATE'),
  PENDING: uSymbol('PENDING', 'RESPONSE_STATE'),
  OK: uSymbol('OK', 'RESPONSE_STATE')
});


export const CHART_COLOR = [
  '#d00266',
  '#00b1ce',
  'violet',
  'black',
  'yellow'
];

export const GENDER = constant('GENDER', {
  MALE: 'M',
  FEMALE: 'F'
});

addStrMap('t_gender', {
  [GENDER.MALE]: 'Male',
  [GENDER.FEMALE]: 'Female'
});

export const ERROR_TYPE = constant('ERROR_TYPE', {
  CONNECTION_ERROR: uSymbol('connection_error'),
  DEFAULT_ERROR: uSymbol('default_error'),
  CLIENT_ERROR: uSymbol('client_error'),
  SERVER_ERROR: uSymbol('server_error'),
  VALIDATION: uSymbol('validation_error'),
  RESOURCE_NOT_FOUND: uSymbol('resource_not_found')
});
