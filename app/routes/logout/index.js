import root from '../root';
import PageLogOut from '../../components/page/PageLogOut';



export default root.createRootRoute('logout', {
  url: '/logout',
  slots: {
    root: PageLogOut
  }
});
