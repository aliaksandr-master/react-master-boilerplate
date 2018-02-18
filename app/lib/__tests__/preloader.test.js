/* eslint-env browser, jest */

import { disableMainPreloader } from '../preloader';



jest.useFakeTimers();

describe('preloader', () => {
  it('should disable preloader', () => {
    window.document.body.innerHTML = '<div id="sm-loader"></div>';

    expect(() => {
      disableMainPreloader();

      jest.runAllTimers();

      expect(setTimeout.mock.calls.length).toBe(1);
    }).not.toThrow();
  });
});
