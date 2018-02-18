/* eslint-env jest */
import assertInstanceOf from '../assert-instance-of';



describe('assertInstanceOf', () => {
  const Some = class {};

  it('should throws', () => {
    expect(() => {
      assertInstanceOf(Some, 'some', {});
    }).toThrow();
    expect(() => {
      assertInstanceOf([ Some ], 'some', {});
    }).toThrow();
  });

  it('should pass', () => {
    expect(() => {
      assertInstanceOf(Some, 'some', new Some());
    }).not.toThrow();

    expect(() => {
      assertInstanceOf([ Some ], 'some', new Some());
    }).not.toThrow();
  });
});
