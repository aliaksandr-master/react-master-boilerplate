import TransportApi from '../../../transports/TransportApi';
import api from '../../../resources/api/origin';



export default api.resource('/login', { transport: new TransportApi() });
