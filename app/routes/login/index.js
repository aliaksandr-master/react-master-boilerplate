import root from '../root';
import PageLogIn from '../../components/page/PageLogIn';



export default root.createRootRoute('login', {
  url: '/login',
  slots: {
    root: PageLogIn
  }
});
