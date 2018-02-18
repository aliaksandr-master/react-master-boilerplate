import { mapProps } from 'recompose';
import { Redirect } from 'react-composite-router';
import route from '../root';



const homeRoute = route.createRootRoute('home', {
  url: '/',
  slots: {
    root: mapProps(() => ({ state: 'login' }))(Redirect)
  }
});


export default homeRoute; // DO NOT export this function directly. there is bug with jest coverage collecting
