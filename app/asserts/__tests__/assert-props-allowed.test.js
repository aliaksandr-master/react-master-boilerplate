/* eslint-env jest */
import assertPropsAllowed from '../assert-props-allowed';



test('should throws', () => {
  expect(() => {
    assertPropsAllowed([], 'some', { a: 3 });
  }).toThrow();
});
test('should pass', () => {
  expect(() => {
    assertPropsAllowed([ 'a' ], 'some', { a: 3 });
  }).not.toThrow();
});
