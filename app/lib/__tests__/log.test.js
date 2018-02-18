/* eslint-env browser, jest */

import { logError } from '../log';



describe('error', () => {
  const console = window.console;

  beforeEach(() => {
    window.console = {};
  });

  afterEach(() => {
    window.console = console;
  });

  it('should', () => {
    window.console.error = jest.fn();

    logError('some');

    expect(window.console.error).toBeCalled();
  });
});
