// Synchronous Action Creator Tests

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../api'; // Assuming this is where your API call is defined
import { assayActions } from '../assay_actions.js';
import { fetchLipinskiSucceeded } from '../assay_actions.js'; // Adjust the path as necessary

// Setting up Redux middleware (thunk) for asynchronous action support and creating a mock store for testing.
// This avoids affecting the actual application state.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the entire api module
jest.mock('../../api', () => ({
    ...jest.requireActual('../../api'), // This line is optional, it retains the original implementations of other functions
    postChosen: jest.fn(), // Explicitly mock postChosen
    postSaved: jest.fn(),
    fetchDescriptors: jest.fn(),
    fetchLipinski: jest.fn(),
}));

// Grouping tests related to assayActions using describe.
describe('assayActions', () => {
    describe('saveMoleculeSucceeded', () => {
      // Defining a test case to ensure the saveMoleculeSucceeded action creator dispatches the expected action.
      it('dispatches SAVE_MOLECULE_SUCCEEDED action with the expected payload', () => {
        // Defining the payload expected to be used when dispatching the action.
        const expectedPayload = { saved_mols: { /* mock saved_mols object */ }};
        // Defining the action object we expect to be dispatched by the action creator.
        const expectedActions = [
          { type: 'SAVE_MOLECULE_SUCCEEDED', payload: expectedPayload }
        ];
  
        // Initializing the mock store with an empty state before testing.
        // This ensures the test starts with a clean state.
        const store = mockStore({});
  
        // Dispatching the action to be tested with the mock payload.
        // This simulates the action being dispatched in the application.
        store.dispatch(assayActions.saveMoleculeSucceeded(expectedPayload.saved_mols));
  
        // Asserting that the actions dispatched to the mock store match the expected actions.
        // This verifies that the action creator behaves as expected when called.
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  
describe('runAssaySucceeded Action Creator', () => {
      it('dispatches RUN_ASSAY_SUCCEEDED action with the correct payload', () => {
        // Define the mock inputs for the action creator
        const mockSelectedMol = { id: 'mol1', name: 'Molecule 1' };
        const mockAssays = { assay1: true, assay2: false };
    
        // Define the expected action to be returned by runAssaySucceeded
        const expectedAction = {
          type: 'RUN_ASSAY_SUCCEEDED',
          payload: {
            molecule: mockSelectedMol,
            assays_run: mockAssays,
          },
        };
    
        // Call the action creator with the mock inputs
        const action = assayActions.runAssaySucceeded(mockSelectedMol, mockAssays);
    
        // Assert that the returned action matches the expected action
        expect(action).toEqual(expectedAction);
      });
    });
  
  // Describe the suite of tests for fetchDescriptorsSucceeded actions
describe('fetchDescriptorsSucceeded Action Creator', () => {
      it('creates FETCH_DESCRIPTORS_SUCCEEDED action with the correct payload', () => {
        // Define the mock inputs for the action creator
        const mockMolecule = { id: 'mol1', name: 'Molecule 1' };
        const mockDescriptors = { descriptor1: 'value1', descriptor2: 'value2' };
    
        // Define the expected action to be returned by fetchDescriptorsSucceeded
        const expectedAction = {
          type: 'FETCH_DESCRIPTORS_SUCCEEDED',
          payload: {
            molecule: mockMolecule,
            descriptors: mockDescriptors,
          },
        };
    
        // Call the action creator with the mock inputs
        const action = assayActions.fetchDescriptorsSucceeded(mockMolecule, mockDescriptors);
    
        // Assert that the returned action matches the expected action
        expect(action).toEqual(expectedAction);
      });
    });
  
describe('fetchLipinskiSucceeded Action Creator', () => {
      it('creates FETCH_LIPINSKI_SUCCEEDED action with the correct payload', () => {
        // Define the mock inputs for the action creator
        const mockMolecule = { id: 'mol2', name: 'Molecule 2' };
        const mockLipinski = { ruleOfFiveCompliance: true, properties: { logP: 2.3, molecularWeight: 310 } };
    
        // Define the expected action to be returned by fetchLipinskiSucceeded
        const expectedAction = {
          type: 'FETCH_LIPINSKI_SUCCEEDED',
          payload: {
            molecule: mockMolecule,
            lipinski: mockLipinski,
          },
        };
    
        // Call the action creator with the mock inputs
        const action = fetchLipinskiSucceeded(mockMolecule, mockLipinski);
    
        // Assert that the returned action matches the expected action
        expect(action).toEqual(expectedAction);
      });
    });
  
  
describe('toggleAssay Asynchronous Action', () => {
    it('correctly dispatches toggleAssaySucceeded action', async () => {
      // Mock data for testing
      const selectedMol = { id: 'mol1', name: 'Molecule 1' };
      const assayType = 'assayType1';
      const isSelected = true;
  
      // Expected action to be dispatched
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
  
      // Create a mock store
      const store = mockStore({});
  
      // Dispatch toggleAssay and wait for actions to be dispatched
      await store.dispatch(assayActions.toggleAssay(selectedMol, assayType, isSelected));
  
      // Check if the expected actions match the dispatched actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
describe('toggleHelpSucceeded Action Creator', () => {
      it('creates an action with the correct type and boolean payload', () => {
        const boolValue = false; // Another boolean value to test with
    
        // The action we expect to be created
        const expectedAction = {
          type: 'TOGGLE_HELP_SUCCEEDED',
          payload: { Bool: boolValue },
        };
    
        // Create the action using toggleHelpSucceeded
        const action = assayActions.toggleHelpSucceeded(boolValue);
    
        // Verify the action's structure
        expect(action).toEqual(expectedAction);
      });
  });
  
describe('toggleAssaySucceeded Action Creator', () => {
      it('creates an action with the correct type and payload', () => {
          const selectedMol = { id: 'mol2', name: 'Molecule 2' };
          const assayType = 'type2';
          const isSelected = false;
  
          const expectedAction = {
              type: 'TOGGLE_ASSAY_SUCCEEDED',
              payload: {
                  molecule: selectedMol,
                  assay_type: assayType,
                  is_selected: isSelected,
              },
          };
  
          const action = assayActions.toggleAssaySucceeded(selectedMol, assayType, isSelected);
          expect(action).toEqual(expectedAction);
      });
  });



  /// Asnychronous Action creators Test


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

describe('saveMolecule Asynchronous Action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        // Reset mocks before each test
        api.postSaved.mockClear();
        api.fetchDescriptors.mockClear();
        api.fetchLipinski.mockClear();
    });

    it('correctly dispatches actions after API calls succeed', async () => {
        // Mock API responses
        const mol_id = 'R1R2'; // Example mol_id based on A and B
        api.postSaved.mockResolvedValue({ success: true }); // Simplified mock response
        api.fetchDescriptors.mockResolvedValue({
            data: {
                descriptors: {
                    [mol_id]: { someKey: 'someDescriptorValue' } // Mock descriptor data
                }
            }
        });
        api.fetchLipinski.mockResolvedValue({
            data: {
                lipinski: {
                    [mol_id]: { anotherKey: 'someLipinskiValue' } // Mock Lipinski data
                }
            }
        });

        const savedMolsInitial = {}; // Initial state of saved molecules
        const selectedRGroups = {
            A: 'R1',
            B: 'R2',
            molecule: {
                data: {} // Initial data structure for the molecule
            }
        };
        const currentTime = 0; // Example current time

        // Expected actions based on the mock API responses
        const expectedActions = [
            {
                type: 'SAVE_MOLECULE_SUCCEEDED',
                payload: {
                    saved_mols: {
                        ...savedMolsInitial,
                        [mol_id]: {
                            data: {
                                toggle_assay: { pIC50: false, clearance_mouse: false, clearance_human: false, logd: false, pampa: false },
                                date_created: 30 - currentTime
                            }
                        }
                    }
                }
            },
            {
                type: 'FETCH_DESCRIPTORS_SUCCEEDED',
                payload: {
                    molecule: mol_id,
                    descriptors: { someKey: 'someDescriptorValue' }
                }
            },
            {
                type: 'FETCH_LIPINSKI_SUCCEEDED',
                payload: {
                    molecule: mol_id,
                    lipinski: { anotherKey: 'someLipinskiValue' }
                }
            }
        ];

        // Dispatch the action with the mocked arguments
        await store.dispatch(assayActions.saveMolecule(savedMolsInitial, selectedRGroups, currentTime));

        // Verify that the dispatched actions match the expected sequence
        expect(store.getActions()).toEqual(expectedActions);
    });
});