import { compose, setDisplayName } from 'recompose';
import PageNotFound from './PageNotFound.view';



export default compose(
  setDisplayName('PageNotFound')
)(PageNotFound);
