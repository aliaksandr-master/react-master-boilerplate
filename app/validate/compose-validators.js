import isFunction from 'lodash/isFunction';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';
import assertIsFunction from '../asserts/assert-is-function';



const allIsOk = () => undefined;

export default (...validators) => {
  validators = validators.filter((validator, index) => {
    if (validator == null) {
      return false;
    }

    if (__ASSERTS_ENABLED__) {
      assertIsFunction(`validator[${index}]`, validator);
    }

    return isFunction(validator);
  });

  if (!validators.length) {
    return allIsOk;
  }

  if (validators.length === 1) {
    return validators[0];
  }

  return (value) => {
    for (let i = 0; i < validators.length; i++) { // eslint-disable-line fp/no-loops
      const message = validators[i](value);

      if (message != null) {
        if (__ASSERTS_ENABLED__) {
          assertTrimmedNonEmptyString('validator message', message);
        }

        return message;
      }
    }

    return undefined;
  };
};
