import { compose, setDisplayName } from 'recompose';
import ChartComponent from './ChartProgress.view';



export default compose(
  setDisplayName('ChartProgress')
)(ChartComponent);
