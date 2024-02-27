import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../api'; // Assuming this is where your API call is defined
import { assayActions } from '../../assay_actions.js';

// Setup mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// At the top of your test file, mock the entire api module
jest.mock('../../../api', () => ({
    ...jest.requireActual('../../../api'), // This line is optional, it retains the original implementations of other functions
    postChosen: jest.fn(), // Explicitly mock postChosen
    postSaved: jest.fn(),
  }));
  

describe('runAssay Asynchronous Action', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    api.postChosen.mockClear();
  });

  it('correctly dispatches runAssaySucceeded action after successful API call', async () => {
    // Mock the API response
    const mockApiResponse = { data: {/* Response data */} };
    api.postChosen.mockResolvedValue(mockApiResponse);

    // Define the expected actions to be dispatched
    const expectedActions = [
      {
        type: 'RUN_ASSAY_SUCCEEDED',
        payload: {/* Expected payload based on mockApiResponse */}
      }
    ];

    // Create a mock store
    const store = mockStore({});

    // Dispatch runAssay and wait for the promise to resolve
    await store.dispatch(assayActions.runAssay(/* arguments for runAssay if any */));

    // Check if the expected actions match the dispatched actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('toggleHelp Asynchronous Action', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({});
    });
  
    it('dispatches toggleHelpSucceeded with the correct boolean value', async () => {
      const boolValue = true; // The boolean value to test with
  
      // Expected action that should be dispatched
      const expectedActions = [
        {
          type: 'TOGGLE_HELP_SUCCEEDED',
          payload: { Bool: boolValue },
        },
      ];
  
      // Dispatch the toggleHelp action
      await store.dispatch(assayActions.toggleHelp(boolValue));
  
      // Check if the expected action was dispatched
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

describe('toggleAssay Asynchronous Action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches toggleAssaySucceeded with the expected payload', async () => {
        const selectedMol = { id: 'mol1', name: 'Molecule 1' };
        const assayType = 'type1';
        const isSelected = true;

        const expectedActions = [
            {
                type: 'TOGGLE_ASSAY_SUCCEEDED',
                payload: {
                    molecule: selectedMol,
                    assay_type: assayType,
                    is_selected: isSelected,
                },
            },
        ];

        await store.dispatch(assayActions.toggleAssay(selectedMol, assayType, isSelected));
        expect(store.getActions()).toEqual(expectedActions);
    });
});




