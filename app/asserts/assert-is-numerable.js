import isNumerable from '../lib/isNumerable';



export default (name, value) => {
  if (!isNumerable(value)) {
    throw new Error(`${name} "${value}" has invalid type. must be Number of String with digits`);
  }
};
