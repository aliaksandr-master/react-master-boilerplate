import memoize from 'lodash/memoize';
import map from 'lodash/map';
import md5 from 'crypto-js/md5';



export default memoize((email, size) => {
  const options = {
    d: 'mm',
    r: 'x',
    s: size || 120
  };

  const hash = md5(email).toString();

  const paramsString = map(options, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&');

  return `https://secure.gravatar.com/avatar/${hash}?${paramsString}`;
}, (...args) => args.join(','));
