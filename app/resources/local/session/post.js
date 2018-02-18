import resource from './resource';



const create = resource.request('POST');


export default (data) => create({}, data);
