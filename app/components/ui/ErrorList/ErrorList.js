import { compose, setDisplayName } from 'recompose';
import ErrorListView from './ErrorList.view';



export default compose(
  setDisplayName('ErrorList')
)(ErrorListView);
