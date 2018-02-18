import cloneDeep from 'lodash/cloneDeep';
import { Transport, Response } from '../vendor/multi-routing-api';



export default class TransportStub extends Transport {
  request (/*method, address, data, options*/) {
    let response = new Response({ ok: true, status: 200, result: cloneDeep(this.settings.data) });

    if (this.settings.prepare) {
      response = this.settings.prepare(response);
    }

    if (this.settings.instant) {
      return Promise.resolve(response);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, Math.random() * 3000);
    });
  }
}
