import { routesTree } from 'react-composite-router';
import SandboxComponent from './SandboxComponent';
import Sandbox from './Sandbox';



const tree = routesTree();


const root = tree.createRootRoute('sandbox', {
  url: '/sandbox',
  slots: {
    root: Sandbox
  }
});

root.createChildRoute('sandbox.component', {
  params: {
    variation: 'default'
  },
  url: '/component/:componentId/:variation',
  slots: {
    component: SandboxComponent
  }
});


export default tree;
