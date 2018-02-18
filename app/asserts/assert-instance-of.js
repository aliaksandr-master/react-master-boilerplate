import isArray from 'lodash/isArray';



export default (constructor, name, instance) => {
  if (isArray(constructor) ? constructor.every((constructor) => !(instance instanceof constructor)) : !(instance instanceof constructor)) {
    throw new TypeError(`${name} has invalid type of instance`);
  }
};
