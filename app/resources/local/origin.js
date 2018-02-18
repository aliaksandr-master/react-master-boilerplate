import { origin } from '../../vendor/multi-routing-api';
import TransportLocalForageWithDefault from '../../transports/TransportLocalForageWithDefault';



export default origin({
  webResource: false,
  transport: new TransportLocalForageWithDefault({ localforage: { name: 'CA' } })
});
