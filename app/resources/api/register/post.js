import createSession from '../../../resources/local/session/post';
import resource from './resource';



const login = resource.request('POST', {
  $disableServerErrorPopup: true
});


export default (data, params = {}) =>
  Promise.resolve(login(params, data))
    .then((response) => {
      const { result: { token, type = 'Token', user_id } } = response;

      return Promise.resolve(createSession({ token, type, user_id }))
        .then(() => response);
    });
