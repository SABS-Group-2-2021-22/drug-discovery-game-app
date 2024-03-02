import { initReducer } from '../../init_reducer.js'; 


describe('initReducer', () => {
  const initialState = {
    all_r_groups: {},
    help: [],
    rgfetched: false,
    rochefetched: false,
    helpfetched: false,
    num: 0,
  };

  it('should return the initial state', () => {
    expect(initReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_R_GROUP_SUCCEEDED', () => {
    const action = { type: 'FETCH_R_GROUP_SUCCEEDED', payload: { r_groups: { group1: 'details' } } };
    const expectedState = {
      ...initialState,
      all_r_groups: { group1: 'details' },
      rgfetched: true,
    };
    expect(initReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ROCHE_SUCCEEDED', () => {
    const action = { type: 'FETCH_ROCHE_SUCCEEDED', payload: { Roche: 'data' } };
    const expectedState = {
      ...initialState,
      Roche: 'data',
      rochefetched: true,
    };
    expect(initReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_HELP_SUCCEEDED', () => {
    const action = { type: 'FETCH_HELP_SUCCEEDED', payload: { help: ['help1', 'help2'] } };
    const expectedState = {
      ...initialState,
      help: ['help1', 'help2'],
      helpfetched: true,
    };
    expect(initReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle COUNTR_START', () => {
    const action = { type: 'COUNTR_START', payload: { num: 1 } };
    const expectedState = {
      ...initialState,
      num: 1,
    };
    expect(initReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return the current state for an unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    expect(initReducer(initialState, action)).toEqual(initialState);
  });
});

describe('initReducer immutability tests', () => {
    // Define the initial state explicitly within the test suite
    const initialState = {
      all_r_groups: {},
      help: [],
      rgfetched: false,
      rochefetched: false,
      helpfetched: false,
      num: 0,
    };
  
    it('ensures immutability for FETCH_R_GROUP_SUCCEEDED', () => {
      const action = { type: 'FETCH_R_GROUP_SUCCEEDED', payload: { r_groups: { group1: 'details' } } };
      const stateBefore = { ...initialState };
      const newState = initReducer(stateBefore, action);
  
      expect(newState).not.toBe(stateBefore);
      expect(newState.all_r_groups).not.toBe(stateBefore.all_r_groups);
    });
  });
  
