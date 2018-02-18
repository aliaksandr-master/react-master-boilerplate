import assertPlainObject from './assert-is-plain-object';
import assertIsFunction from './assert-is-function';



export default (name, filter = null, obj) => {
  assertPlainObject(name, obj);

  let invalidProps = Object.keys(obj);

  if (filter !== null) {
    assertIsFunction('filter', filter);

    invalidProps = invalidProps.filter((key) => filter(obj[key], key));
  }

  if (invalidProps.length) {
    throw new Error(`${name} has redundant props [${invalidProps.join(',')}]`);
  }
};
