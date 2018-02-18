/* eslint-env browser, jest */

import { createReducer, _checkActionFormat, _GLOBAL_PREFIX, _actionGlobal } from '../reducer';



describe('_checkActionFormat', () => {
  it('should throw if invalid format when env is not production', () => {
    expect(() => {
      _checkActionFormat();
    }).toThrow();

    expect(() => {
      _checkActionFormat('###');
    }).toThrow();
  });

  it('should pass value if valid', () => {
    const action = _checkActionFormat('ACTION');

    expect(action).toEqual('ACTION');
  });
});



describe('_actionGlobal', () => {
  it('should pass value if valid', () => {
    const action = _actionGlobal('ACTION');

    expect(action).toEqual(`${_GLOBAL_PREFIX}ACTION`);
  });
});



describe('createReducer', () => {
  it('should throws if actions has invalid format', () => {
    expect(() => {
      createReducer('SomeTestReducer1', {});
    }).toThrow();

    expect(() => {
      createReducer('SomeTestReducer2', {}, {
        'HELLO': null
      });
    }).toThrow();
  });

  it('should set initial state', () => {
    const reducer = createReducer('SomeTestReducer3', { a: 1 }, {
      'HELLO': (state, action) => {}
    });

    const state = reducer(undefined, { type: 'some' });

    expect(state).toEqual({ a: 1 });
  });

  it('should call reducer', () => {
    const result = Date.now();
    const reducer = createReducer('SomeTestReducer4', { result: 1 }, {
      'HELLO': (state, action) => ({ result })
    });

    const state = reducer(undefined, { type: 'HELLO' });

    expect(state).toEqual({ result });
  });

  it('should create multi reducer', () => {
    const result = Date.now();
    const reducer = createReducer('SomeTestReducer5', { result: 1 }, {
      'HELLO': (state, action) => state,
      'HELLO,HELLO2': (state, action) => ({ result })
    });

    const state = reducer(undefined, { type: 'HELLO' });

    expect(state).toEqual({ result });
  });
});
