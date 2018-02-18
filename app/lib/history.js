import createBrowserHistory from 'history/createBrowserHistory';
import { BASE_URL } from '../config';



export default createBrowserHistory({
  basename: BASE_URL
});
