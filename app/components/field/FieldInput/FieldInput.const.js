import uSymbol from 'usymbol';
import constant from '../../../lib/const';



export const THEME = constant('THEME', {
  DEFAULT: uSymbol('DEFAULT', 'FieldInput'),
  WITH_ICON: uSymbol('WITH_ICON', 'FieldInput')
});

export const SIZE = constant('SIZE', {
  DEFAULT: uSymbol('sizeDefault', 'FieldInput'),
  SMALL: uSymbol('sizeSmall', 'FieldInput'),
  LARGE: uSymbol('sizeLarge', 'FieldInput')
});

export const TYPE = constant('TYPE', {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  MULTILINE: 'MULTILINE'
});
