import { assayReducer } from '../../assay_reducer.js';

beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.clearAllTimers();
  });
  

describe('assayReducer', () => {
  it('should return the initial state', () => {
    // Define the expected initial state based on your reducer's definition.
    const expectedInitialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };

    // Call the reducer with undefined state and an empty action object.
    const initialState = assayReducer(undefined, {});

    // Assert that the initial state returned by the reducer matches the expected initial state.
    expect(initialState).toEqual(expectedInitialState);
  });
});

describe('assayReducer actions', () => {
    // Test for SAVE_MOLECULE_SUCCEEDED action
    it('should handle SAVE_MOLECULE_SUCCEEDED action', () => {
      const initialState = {
        saved_or_not: false,
        saved_mols: {},
        toggle_help: false,
        invoice_display: false,
        invoice: false,
      };
      const action = {
        type: 'SAVE_MOLECULE_SUCCEEDED',
        payload: { saved_mols: { id: 'mol1', data: 'data' } },
      };
      const expectedState = {
        ...initialState,
        saved_or_not: true,
        saved_mols: action.payload.saved_mols,
      };
  
      const newState = assayReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
  
    // Test for FETCH_DESCRIPTORS_SUCCEEDED action
    it('should handle FETCH_DESCRIPTORS_SUCCEEDED action', () => {
      const initialState = {
        saved_or_not: false,
        saved_mols: {
          'mol1': {
            data: {}
          }
        },
        toggle_help: false,
        invoice_display: false,
        invoice: false,
      };
      const action = {
        type: 'FETCH_DESCRIPTORS_SUCCEEDED',
        payload: {
          molecule: 'mol1',
          descriptors: { desc: 'descData' }
        },
      };
      const expectedState = {
        ...initialState,
        saved_mols: {
          ...initialState.saved_mols,
          'mol1': {
            data: {
              descriptors: action.payload.descriptors
            },
          },
        },
      };
  
      const newState = assayReducer(initialState, action);
      expect(newState).toEqual(expectedState);
    });
    
    // Test default case (unknown action)
    it('should return the current state for an unknown action type', () => {
      const currentState = {
        saved_or_not: true,
        saved_mols: { 'mol1': { data: 'someData' } },
        toggle_help: true,
        invoice_display: true,
        invoice: true,
      };
      const action = { type: 'UNKNOWN_ACTION' };
      const newState = assayReducer(currentState, action);
      expect(newState).toEqual(currentState);
    });
  });

  // Test for SAVE_SKETCHED_MOLECULE_SUCCEEDED action
it('should handle SAVE_SKETCHED_MOLECULE_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'SAVE_SKETCHED_MOLECULE_SUCCEEDED',
      payload: { saved_mols: { id: 'mol2', data: 'data2' } },
    };
    const expectedState = {
      ...initialState,
      saved_or_not: true,
      saved_mols: action.payload.saved_mols,
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for FETCH_LIPINSKI_SUCCEEDED action
  it('should handle FETCH_LIPINSKI_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: { 'mol1': { data: {} } },
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'FETCH_LIPINSKI_SUCCEEDED',
      payload: { molecule: 'mol1', lipinski: { ruleOfFive: 'yes' } },
    };
    const expectedState = {
      ...initialState,
      saved_mols: {
        ...initialState.saved_mols,
        'mol1': {
          data: {
            ...initialState.saved_mols['mol1'].data,
            lipinski: action.payload.lipinski,
          },
        },
      },
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for RUN_ASSAY_SUCCEEDED action
  it('should handle RUN_ASSAY_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: { 'mol1': { data: {} } },
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'RUN_ASSAY_SUCCEEDED',
      payload: { molecule: 'mol1', assays_run: { result: 'positive' } },
    };
    const expectedState = {
      ...initialState,
      saved_mols: {
        ...initialState.saved_mols,
        'mol1': {
          data: {
            ...initialState.saved_mols['mol1'].data,
            assays_run: action.payload.assays_run,
          },
        },
      },
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for TOGGLE_HELP_SUCCEEDED action
  it('should handle TOGGLE_HELP_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'TOGGLE_HELP_SUCCEEDED',
      payload: { Bool: true },
    };
    const expectedState = {
      ...initialState,
      toggle_help: action.payload.Bool,
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for INVOICE_DISPLAY_SUCCEEDED action
  it('should handle INVOICE_DISPLAY_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'INVOICE_DISPLAY_SUCCEEDED',
      payload: { Bool: true },
    };
    const expectedState = {
      ...initialState,
      invoice_display: action.payload.Bool,
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for SHOW_INVOICE_SUCCEEDED action
  it('should handle SHOW_INVOICE_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'SHOW_INVOICE_SUCCEEDED',
      payload: { invoice: 'details' },
    };
    const expectedState = {
      ...initialState,
      invoice: action.payload.invoice,
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test for TOGGLE_ASSAY_SUCCEEDED action
it('should handle TOGGLE_ASSAY_SUCCEEDED action', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {
        'mol1': {
          data: {
            toggle_assay: {}
          }
        }
      },
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'TOGGLE_ASSAY_SUCCEEDED',
      payload: {
        molecule: 'mol1',
        assay_type: 'assay1',
        is_selected: true
      },
    };
    const expectedState = {
      ...initialState,
      saved_mols: {
        ...initialState.saved_mols,
        'mol1': {
          ...initialState.saved_mols['mol1'],
          data: {
            ...initialState.saved_mols['mol1'].data,
            toggle_assay: {
              ...initialState.saved_mols['mol1'].data.toggle_assay,
              'assay1': action.payload.is_selected,
            },
          },
        },
      },
    };
  
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
  
  // Test for handling an action with an empty payload
it('should handle an action with an empty payload without changing state', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'SAVE_MOLECULE_SUCCEEDED',
      payload: {},
    };
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  // Test for handling an action with an unexpected payload structure
it('should not alter state on receiving unexpected payload structure', () => {
    const initialState = {
      saved_or_not: true,
      saved_mols: { 'mol1': { data: 'someData' } },
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'FETCH_DESCRIPTORS_SUCCEEDED',
      payload: { unexpectedProp: 'unexpectedData' },
    };
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  // Test for handling an action where the payload is null
it('should handle an action with a null payload without changing state', () => {
    const initialState = {
      saved_or_not: false,
      saved_mols: {},
      toggle_help: false,
      invoice_display: false,
      invoice: false,
    };
    const action = {
      type: 'SAVE_MOLECULE_SUCCEEDED',
      payload: null,
    };
    const newState = assayReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
  
  
  