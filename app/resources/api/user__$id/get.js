import resource from './resource';



const get = resource.request('GET');


export default (userID, params = {}) =>
  get({ ...params, userID }, params);
