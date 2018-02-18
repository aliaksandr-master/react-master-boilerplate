import assertIsRegExp from './assert-is-regexp';
import assertIsString from './assert-is-string';



export default (regexp, name, value) => {
  if (__ASSERTS_ENABLED__) {
    assertIsRegExp(`assert of "${name}"`, regexp);
  }

  assertIsString(name, value);

  if (!regexp.test(value)) {
    throw new Error(`${name} "${value}" has invalid format`);
  }
};
