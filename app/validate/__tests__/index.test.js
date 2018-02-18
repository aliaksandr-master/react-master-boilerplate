/* eslint-env browser, jest */
import composeValidators from '../compose-validators';
import required from '../required';
import maxLength from '../max-length';
import numberGt from '../number-gt';



describe('compose', () => {
  it('should be valid', () => {
    const validate = composeValidators(
      required(),
      numberGt(20),
      maxLength(3)
    );

    expect(validate(444)).toBe(undefined);
  });

  it('should be invalid', () => {
    const validate = composeValidators(
      required(),
      numberGt(20),
      maxLength(3)
    );

    expect(validate(4444)).toBe('Must be 3 characters or less');
  });

  it('should throw error if validator is not a function', () => {
    expect(() => {
      composeValidators(
        required(),
        numberGt(20),
        'error!'
      );
    }).toThrow();
  });
});
