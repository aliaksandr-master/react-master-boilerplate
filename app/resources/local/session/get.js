import { Response } from '../../../vendor/multi-routing-api';
import { AUTH_TYPE, AUTH_TOKEN } from '../../../config';
import resource from './resource';



const get = resource.request('GET');


export default () => {
  if (AUTH_TOKEN && AUTH_TYPE) {
    return Promise.resolve(new Response({
      ok: true,
      status: 200,
      result: {
        type: AUTH_TYPE,
        token: AUTH_TOKEN
      }
    }));
  }

  return get();
};
