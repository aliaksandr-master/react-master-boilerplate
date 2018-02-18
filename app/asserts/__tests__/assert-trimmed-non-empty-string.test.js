/*eslint-env jest*/
import assertTrimmedNonEmptyString from '../assert-trimmed-non-empty-string';



describe('assertTrimmedNonEmptyString', () => {
  it('should throws', () => {
    expect(() => {
      assertTrimmedNonEmptyString('some', 123);
    }).toThrow();
    expect(() => {
      assertTrimmedNonEmptyString('some', '');
    }).toThrow();
    expect(() => {
      assertTrimmedNonEmptyString('some', '  ');
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertTrimmedNonEmptyString('some', '123');
    }).not.toThrow();
  });
});
