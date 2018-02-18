import { compose, setDisplayName } from 'recompose';
import ErrorListValidationView from './ErrorListValidation.view';



export default compose(
  setDisplayName('ErrorListValidation')
)(ErrorListValidationView);
