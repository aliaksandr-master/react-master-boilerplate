import resource from './resource';



const patch = resource.request('PATCH');


export default (userID, data, params = {}) =>
  patch({ ...params, userID }, data);
