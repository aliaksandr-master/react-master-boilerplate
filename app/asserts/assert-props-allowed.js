import assertPlainObject from './assert-is-plain-object';
import assertAvailableValues from './assert-variants';
import assertIsArray from './assert-is-array';



export default (availableProps, name, value) => {
  if (__ASSERTS_ENABLED__) {
    assertIsArray(`availableProps of assert "${name}"`, availableProps);
  }

  assertPlainObject(name, value);

  Object.keys(value).forEach((val) => {
    assertAvailableValues(availableProps, name, val);
  });
};
