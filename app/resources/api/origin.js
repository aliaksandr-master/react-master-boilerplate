import { origin } from '../../vendor/multi-routing-api';
import { API_URL } from '../../config';
import TransportAuthJSON from '../../transports/TransportApiAuthentication';



let notifyBegin = () => {};
let notifyEnd = () => {};

export const setBeginNotifier = (func) => {
  notifyBegin = func;
};

export const setEndNotifier = (func) => {
  notifyEnd = func;
};



export default origin({
  baseUrl: API_URL,
  notifyBegin (...args) {
    notifyBegin(...args);
  },
  notifyEnd (...args) {
    notifyEnd(...args);
  },
  transport: new TransportAuthJSON()
});
