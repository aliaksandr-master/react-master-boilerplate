import resource from './resource';



const logout = resource.request('POST');


export default () => logout();
