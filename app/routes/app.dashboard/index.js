import app from '../app';
import PageDashboard from '../../components/page/PageDashboard';



export default app.createChildRoute('app.dashboard', {
  url: '/dashboard',
  slots: {
    appBody: PageDashboard
  }
});
