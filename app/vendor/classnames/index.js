import isString from 'lodash/isString';



const classNames = (...args) => {
  let classes = '';
  const len = args.length;
  let i = 0;

  while (i < len) { // eslint-disable-line fp/no-loops
    const arg = args[i++];

    if (arg) {
      if (__ASSERTS_ENABLED__ && !isString(arg)) {
        throw new Error('invalid type of className argument');
      }
      classes += classes ? ` ${arg}` : String(arg);
    }
  }

  return classes;
};



export default classNames;
