import route from '../root';
import App from '../../components/page/PageApp';



export default route.createRootRoute('app', {
  url: '/app',
  params: {},
  slots: {
    root: App
  }
});
