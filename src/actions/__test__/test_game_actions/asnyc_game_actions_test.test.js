import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../api'; // Adjust the import path as necessary
import { gameActions } from '../../game_actions';

// Mock the api module and its functions
jest.mock('../../../api', () => ({
  resetGame: jest.fn(),
  saveGame: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('gameActions - Asynchronous actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('dispatches resetGameSucceeded after resetGame', async () => {
    api.resetGame.mockResolvedValueOnce(); // Mock the reset API call to resolve

    const expectedActions = [
      { type: 'RESET', payload: { saved_mols: {} } }
    ];

    await store.dispatch(gameActions.resetGame());

    expect(api.resetGame).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches saveGameSucceeded after saveGame', async () => {
    const mockGameData = { score: 10 }; // Replace with real game data structure
    api.saveGame.mockResolvedValueOnce(); // Mock the save API call to resolve

    const expectedActions = [
      { type: 'SAVE_GAME_SUCCEEDED' }
    ];

    await store.dispatch(gameActions.saveGame(mockGameData));

    expect(api.saveGame).toHaveBeenCalledWith(mockGameData);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches setGamemodeActionSucceeded after setGamemodeAction', async () => {
    const mode = 'hard'; // Example game mode
    const expectedActions = [
      { type: 'GAME_MODE_SET', payload: { gamemode: mode } }
    ];

    // Even though setGamemodeAction is an async action, it does not perform any API calls.
    // It's structured to potentially handle future async operations.
    await store.dispatch(gameActions.setGamemodeAction(mode));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches updateTimeSucceeded with the new time after updateTime', async () => {
    const timeCost = 5;
    const currentTime = 100;
    const expectedTime = currentTime - timeCost;

    const expectedActions = [
      { type: 'UPDATE_TIME_SUCCEEDED', payload: { time: expectedTime } }
    ];

    await store.dispatch(gameActions.updateTime(timeCost, currentTime));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches updateMoneySucceeded with the updated money value after updateMoney', async () => {
    const cost = 50;
    const currentMoney = 500;
    const expectedMoney = currentMoney - cost;

    const expectedActions = [
      { type: 'UPDATE_MONEY_SUCCEEDED', payload: { money: expectedMoney } }
    ];

    await store.dispatch(gameActions.updateMoney(cost, currentMoney));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('calculates and dispatches updateSubTotalSucceeded with the total cost after updateSubTotal', async () => {
    const assays = ['pIC50', 'clearance_human'];
    const expectedSubtotal = 70.0 + 9000.0; // Based on predefined prices in updateSubTotal function

    const expectedActions = [
      { type: 'UPDATE_SUBTOTAL_SUCCEEDED', payload: { subtotal: expectedSubtotal } }
    ];

    await store.dispatch(gameActions.updateSubTotal(assays, 0)); // Assuming initial cost_sum is 0

    expect(store.getActions()).toEqual(expectedActions);
  });
});

// full test suite for the asynchronous actions in gameActions covers the key functionalities of the game's action creators. 
// A summary of the structure and purpose of each test: 
// Mocking API Calls: Before the tests run, mock the API module to ensure that the calls to resetGame and saveGame are simulated without making actual HTTP requests. 
// This approach allows you to test the Redux action creators' behaviour in isolation from the API's implementation. 
// Setting Up a Mock Store: Using redux-mock-store and thunk middleware, we create a mock Redux store that can simulate dispatching actions and accumulating dispatched actions for later inspection. 
// This setup is crucial for testing asynchronous Redux actions. 
// Resetting Mocks Before Each Test: The beforeEach block resets the mock store and clears all previous mock data to ensure a clean testing environment for each test case. 
// Testing Asynchronous Actions: resetGame: this tests that dispatching resetGame calls the mocked api.resetGame function and then dispatches the expected resetGameSucceeded action. 
// saveGame: Similar to resetGame, this test checks that dispatching saveGame with mock game data calls api.saveGame with the same data and dispatches saveGameSucceeded. 
// setGamemodeAction: This tests that setGamemodeAction dispatches setGamemodeActionSucceeded with the correct game mode payload. This action doesn't involve an API call but is structured to allow for potential asynchronous behavior. 
// updateTime: Verifies that updateTime correctly calculates the new time and dispatches updateTimeSucceeded with this value.  
// updateMoney: Checks that updateMoney correctly calculate the remaining money after a cost and dispatches updateMoneySucceeded with the updated value. 
// updateSubTotal: Tests that updateSubTotal calculates the total cost based on selected assays and dispatches updateSubTotalSucceeded with the calculated subtotal. 
// Each test follows a pattern that ensures the actions correctly trigger API calls (where applicable) and dispatch the expected actions with the correct payload. 
// This structure verifies that your asynchronous actions behave as intended, updating the application state based on dynamic inputs and external interactions. 
