/* eslint-env browser, jest */

import composeFilters from '../compose-filters';
import defaults from '../defaults';



const multiply = (factor) => (value) => value * factor;


describe('compose', () => {
  it('should chaining filter functions', () => {
    const filter = composeFilters(
      defaults(3),
      multiply(2)
    );

    expect(filter(undefined)).toEqual(6);
    expect(composeFilters()(3)).toEqual(3);
    expect(composeFilters(null, undefined)(3)).toEqual(3);
    expect(composeFilters(multiply(3))(3)).toEqual(9);
  });
});
