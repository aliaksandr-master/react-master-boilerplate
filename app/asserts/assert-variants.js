import assertIsArray from './assert-is-array';



export default (available, name, value) => {
  if (__ASSERTS_ENABLED__) {
    assertIsArray(name, available);
  }

  if (!available.includes(value)) {
    throw new Error(`${name} has invalid value [${value}]`);
  }
};
