/* eslint-env browser, jest */

import formatNumber from '../format-number';



describe('format-number', () => {
  it('should filter', () => {
    expect(formatNumber()(123)).toEqual('123.00');
  });
});
