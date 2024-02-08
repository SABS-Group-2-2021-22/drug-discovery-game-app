// synchronus test

// Importing dependencies required for testing. This includes a mock store creator for Redux (configureMockStore),
// a middleware for handling asynchronous actions (thunk), and the specific actions (assayActions) we want to test.
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { assayActions } from '../assay_actions.js';
import { fetchLipinskiSucceeded } from '../assay_actions.js'; // Adjust the path as necessary

// Setting up Redux middleware (thunk) for asynchronous action support and creating a mock store for testing.
// This avoids affecting the actual application state.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
  