/* eslint-env browser, jest */

import branch from '../branch';



describe('branch', () => {
  it('must throw', () => {
    expect(() => {
      branch(() => true, '!!!', () => true);
    }).toThrow();
    expect(() => {
      branch('!!!', () => true);
    }).toThrow();
    expect(() => {
      branch(() => true, () => true, '!!!');
    }).toThrow();
    expect(() => {
      branch(() => true);
    }).toThrow();
  });
  it('should pass', () => {
    expect(branch(() => true, () => true, () => false)(undefined)).toEqual(true);
    expect(branch(() => false, () => true, () => false)(undefined)).toEqual(false);
    expect(branch(() => true, undefined, () => false)(undefined)).toEqual(undefined);
    expect(branch(() => false, () => false, undefined)(undefined)).toEqual(undefined);
  });
});
