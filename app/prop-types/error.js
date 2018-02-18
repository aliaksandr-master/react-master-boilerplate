import PropTypes from 'prop-types';
import values from 'lodash/values';
import { ERROR_TYPE } from '../config/constants';



export default PropTypes.shape({
  id: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(values(ERROR_TYPE)),
  typed_params: PropTypes.object
});
