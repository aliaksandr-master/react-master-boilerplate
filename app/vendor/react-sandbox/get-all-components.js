import sortBy from 'lodash/sortBy';
import { origin, TransportJSON } from 'multi-routing-api';



const getComponentsMethod = origin({ baseUrl: `${window.location.protocol}//${window.location.host}/-sandbox-/`, transport: new TransportJSON() })
  .resource('/components')
  .request('GET');


export default () => getComponentsMethod()
  .then((response) => {
    response.result = sortBy(response.result, 'dir');

    return response;
  });
