import assertIsFunction from '../asserts/assert-is-function';



export default (condition, left = null, right = null) => {
  if (__ASSERTS_ENABLED__) {
    assertIsFunction('condition', condition);

    if (left !== null) {
      assertIsFunction('left', left);
    }

    if (right !== null) {
      assertIsFunction('right', right);
    }

    if (right === null && left === null) {
      throw new ReferenceError('left or right functions must be specified!');
    }
  }

  return (value) => {
    if (condition(value)) {
      if (left === null) {
        return value;
      }

      return left(value);
    }

    if (right === null) {
      return value;
    }

    return right(value);
  };
};
