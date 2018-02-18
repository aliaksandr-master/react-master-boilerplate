import { compose, setDisplayName } from 'recompose';
import ErrorListUploadView from './ErrorListMessage.view';



export default compose(
  setDisplayName('ErrorListMessage')
)(ErrorListUploadView);
