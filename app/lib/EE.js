import once from 'lodash/once';
import isFunction from 'lodash/isFunction';



const callChain = (sequence, args = []) => sequence.forEach((cbk) => {
  cbk(...args);
});

const filterCall = (sequence, callback) => sequence.filter((cbk) => cbk !== callback);

export const PrimitiveEE = () => {
  let listeners = [];

  return {
    emit: (...args) =>
      callChain(listeners, args),

    cleanup () {
      listeners = [];
    },

    on (callback) {
      if (!isFunction(callback)) {
        throw new TypeError('callback must be a function');
      }

      listeners.push(callback);

      return once(() => {
        if (!listeners.length) {
          return;
        }

        listeners = filterCall(listeners, callback);
      });
    }
  };
};


const EE = () => {
  let listeners = {};
  let destroyEE = PrimitiveEE();
  let everyEE = PrimitiveEE();
  let destroyed = false;

  const ee = {
    onEveryMessage (callback) {
      if (destroyed) {
        return () => {};
      }

      return everyEE.on(callback);
    },

    sendMessage (eventName, ...args) {
      if (destroyed) {
        return;
      }

      if (!listeners.hasOwnProperty(eventName)) {
        return;
      }

      listeners[eventName].emit(...args);

      everyEE.emit(eventName, ...args);
    },

    onReceiveMessage (eventName, callback) {
      if (destroyed) {
        return () => {};
      }

      if (!listeners.hasOwnProperty(eventName)) {
        const listener = listeners[eventName] = PrimitiveEE();

        ee.onDestroy(() => {
          listener.cleanup();
          listeners[eventName] = null;
        });
      }

      return listeners[eventName].on(callback);
    },

    isDestroyed () {
      return destroyed;
    },

    destroy () {
      if (destroyed) {
        return;
      }

      destroyed = true;
      everyEE.cleanup();
      everyEE = null;
      destroyEE.emit();
      destroyEE.cleanup();
      destroyEE = null;
      listeners = null;
    },

    onDestroy (callback) {
      if (destroyed) {
        return () => {};
      }

      return destroyEE.on(callback);
    },

    childEE () {
      if (destroyed) {
        throw new Error('EE has already destroyed. you couldn\'t create any child');
      }

      const childEE = EE();

      const off = ee.onDestroy(() => {
        childEE.destroy();
      });

      childEE.onDestroy(off);

      childEE.sendMessage = ee.sendMessage;

      childEE.onReceiveMessage = (...args) => {
        const off = ee.onReceiveMessage(...args);

        childEE.onDestroy(off);

        return off;
      };

      return childEE;
    },

    connectLifetime (parentEE) {
      if (destroyed) {
        throw new Error('EE has already destroyed. you couldn\'t connect any child');
      }

      const off = parentEE.onDestroy(() => {
        ee.destroy();
      });

      ee.onDestroy(off);

      return ee;
    }
  };

  return ee;
};


export default EE;
