import { compose, setDisplayName } from 'recompose';
import WaitingText from './WaitingText.view';



export default compose(
  setDisplayName('WaitingText')
)(WaitingText);
