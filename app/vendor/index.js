import moment from 'moment';
import 'moment-timezone';



moment.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';


moment.prototype.toLocalISOString = function () {
  return this.format();
};
