/*eslint-env jest*/
import assertStringMatchRegexp from '../assert-string-match-regexp';



describe('assertRegExp', () => {
  it('should throws', () => {
    expect(() => {
      assertStringMatchRegexp(/hello/, 'some', 123);
    }).toThrow();
    expect(() => {
      assertStringMatchRegexp(/hello/, 'some', 'hell');
    }).toThrow();
  });
  it('should pass', () => {
    expect(() => {
      assertStringMatchRegexp(/hello/, 'some', 'hello dolly');
    }).not.toThrow();
  });
});
