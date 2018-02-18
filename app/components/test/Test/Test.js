import { compose, setDisplayName } from 'recompose';
import TestComponent from './Test.view';



export default compose(
  setDisplayName('Test')
)(TestComponent);
