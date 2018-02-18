import root from '../root';
import PageRegister from '../../components/page/PageRegister';



export default root.createRootRoute('register', {
  url: '/register',
  slots: {
    root: PageRegister
  }
});
