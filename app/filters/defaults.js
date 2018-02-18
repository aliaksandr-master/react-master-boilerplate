import assertIsBoolean from '../asserts/assert-is-boolean';



export default (defaultValue, strict = true) => {
  if (__ASSERTS_ENABLED__) {
    assertIsBoolean('strict', strict);
  }

  return (value) => {
    if (strict) {
      if (value === undefined) {
        return defaultValue;
      }

      return value;
    }

    if (value == null || isNaN(value)) {
      return defaultValue;
    }

    return value;
  };
};
