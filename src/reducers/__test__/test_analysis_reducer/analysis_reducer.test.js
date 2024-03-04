// Import the reducer to test
import { analysisReducer } from '../../analysis_reducer.js';

// Test to ensure the reducer returns the initial state when no action or state is provided.
test('should return the initial state', () => {
  // Assert that the reducer's return value matches the expected initial state.
  expect(analysisReducer(undefined, {})).toEqual({
    spider_data: {},
    comp_text: {},
  });
});

// Test to check if the reducer properly handles the CONSTRUCT_PLOT_OBJECT_SUCCEEDED action.
test('should handle CONSTRUCT_PLOT_OBJECT_SUCCEEDED action', () => {
  // Define the state before the action is dispatched.
  const startState = { spider_data: {}, comp_text: {} };
  
  // Define the action with a type and payload.
  const action = {
    type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
    payload: { plot_data: { someData: 'data' } },
  };

  // Define the expected state after the action is processed.
  const expectedState = {
    spider_data: {},
    comp_text: {},
    plot_data: { someData: 'data' },
  };

  // Assert that the reducer transforms the start state into the expected state.
  expect(analysisReducer(startState, action)).toEqual(expectedState);
});

// Test to verify that the reducer correctly processes the FETCH_SPIDER_SUCCEEDED action.
test('should handle FETCH_SPIDER_SUCCEEDED action', () => {
  // Define the initial state before the action is dispatched.
  const startState = { spider_data: {}, comp_text: {} };
  
  // Define the action to be dispatched.
  const action = {
    type: 'FETCH_SPIDER_SUCCEEDED',
    payload: { spider_data: { newData: 'data' } },
  };

  // Define what the expected state should be after the action is processed.
  const expectedState = {
    spider_data: { newData: 'data' },
    comp_text: {},
  };

  // Assert that the reducer updates the state correctly based on the action.
  expect(analysisReducer(startState, action)).toEqual(expectedState);
});

// Test to ensure the reducer updates the state correctly for FETCH_COMP_TEXT_SUCCEEDED actions.
test('should handle FETCH_COMP_TEXT_SUCCEEDED action', () => {
  // Set up the state before the action is dispatched.
  const startState = { spider_data: {}, comp_text: {} };

  // Define the action with its type and the new data to be incorporated.
  const action = {
    type: 'FETCH_COMP_TEXT_SUCCEEDED',
    payload: { comp_text: { newText: 'text' } },
  };

  // Determine what the expected state should look like after the action.
  const expectedState = {
    spider_data: {},
    comp_text: { newText: 'text' },
  };

  // Test that the reducer correctly updates the state in response to the action.
  expect(analysisReducer(startState, action)).toEqual(expectedState);
});

// Test to confirm that the reducer returns the current state when an unknown action type is provided.
test('should return the current state for an unknown action type', () => {
  // Define the current state.
  const currentState = { spider_data: { someData: 'data' }, comp_text: {} };

  // Create an action with an unrecognized type.
  const action = { type: 'UNKNOWN_ACTION' };

  // The reducer should return the current state unchanged in response to an unknown action type.
  expect(analysisReducer(currentState, action)).toEqual(currentState);
});
