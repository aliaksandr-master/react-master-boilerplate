/* eslint-env browser, jest */

import calcStaticUrl from '../calc-static-url';



describe('getStaticUrl', () => {
  it('should generate static url', () => {
    const url = '/some/url/';

    const variable = calcStaticUrl(url);

    expect(variable).toEqual(url);
  });
});
