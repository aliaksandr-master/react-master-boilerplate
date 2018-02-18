import uSymbol from 'usymbol';
import constant from '../../../lib/const';
import { ERROR_TYPE } from '../../../config/constants';



export const THEME = constant('ErrorList:THEME', {
  DEFAULT: uSymbol('themeDefault', 'ErrorList')
});

export const SIZE = constant('ErrorList:SIZE', {
  DEFAULT: uSymbol('sizeDefault', 'ErrorList')
});

export const DEFAULT_ERROR = {
  $id: uSymbol('default_error_id'),
  message: 'Something went wrong',
  type: ERROR_TYPE.DEFAULT_ERROR,
  typed_params: {}
};
