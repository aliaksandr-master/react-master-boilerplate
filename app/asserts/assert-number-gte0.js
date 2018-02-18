import assertIsNumber from './assert-is-number';



export default (name, value) => {
  assertIsNumber(name, value);

  if (value < 0) {
    throw new Error(`${name} must be positive/zero number. "${value}" given`);
  }
};
