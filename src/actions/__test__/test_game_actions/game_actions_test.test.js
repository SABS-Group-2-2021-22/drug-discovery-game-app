// Import the action creator directly from where it's defined.
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gameActions } from '../../game_actions';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe('gameActions', () => {
  describe('resetGameSucceeded', () => {
    it('creates an action to reset the game state', () => {
      const expectedAction = {
        type: 'RESET',
        payload: {
          saved_mols: {}
        }
      };
      const action = gameActions.resetGameSucceeded();
      expect(action).toEqual(expectedAction);
    });
  });
});

describe('gameActions', () => {
  // Test for saveGameSucceeded action creator
  describe('saveGameSucceeded', () => {
    it('creates an action to signify that the game has been successfully saved', () => {
      const expectedAction = {
        type: 'SAVE_GAME_SUCCEEDED',
      };
      const action = gameActions.saveGameSucceeded();
      expect(action).toEqual(expectedAction);
    });
  });

  // Test for setGamemodeActionSucceeded action creator
  describe('setGamemodeActionSucceeded', () => {
    it('creates an action to set the game mode', () => {
      const mode = 'easy'; // Example game mode
      const expectedAction = {
        type: 'GAME_MODE_SET',
        payload: {
          gamemode: mode,
        },
      };
      const action = gameActions.setGamemodeActionSucceeded(mode);
      expect(action).toEqual(expectedAction);
    });
  });
});

describe('gameActions', () => {
  it('should create an action with the correct type and payload when updateTimeSucceeded is called', () => {
    const testTime = 100; // Example time for testing
    const expectedAction = {
      type: 'UPDATE_TIME_SUCCEEDED',
      payload: {
        time: testTime,
      },
    };
    expect(gameActions.updateTimeSucceeded(testTime)).toEqual(expectedAction);
  });

  it('should create an action with the correct type and payload when updateMoneySucceeded is called', () => {
    const testMoney = 500; // Example money for testing
    const expectedAction = {
      type: 'UPDATE_MONEY_SUCCEEDED',
      payload: {
        money: testMoney,
      },
    };
    expect(gameActions.updateMoneySucceeded(testMoney)).toEqual(expectedAction);
  });

  it('should create an action with the correct type and payload when updateSubTotalSucceeded is called', () => {
    const testSubtotal = 1500; // Example subtotal for testing
    const expectedAction = {
      type: 'UPDATE_SUBTOTAL_SUCCEEDED',
      payload: {
        subtotal: testSubtotal,
      },
    };
    expect(gameActions.updateSubTotalSucceeded(testSubtotal)).toEqual(expectedAction);
  });
});

// test suite for synchronous actions in gameActions covers the core functionalities of resetting the game state, saving the game, setting the game mode, and updating time, money, and subtotal values. 
// This structure ensures that each synchronous action creator produces the correct action object with the appropriate type and payload. 
// breakdown of the structure and purpose of each part of the test suite: 
// Setup with configureMockStore and thunk Middleware: A prepared a mock Redux store using redux-mock-store and thunk. 
// While this setup is essential for asynchronous action tests to simulate dispatching actions, it's not strictly necessary for testing synchronous actions since they don't dispatch or handle promises. 
// However, maintaining this setup doesn't hurt and keeps the test environment consistent across both asynchronous and synchronous tests. 
// Testing resetGameSucceeded Action Creator: This test verifies that calling resetGameSucceeded produces an action with the type 'RESET' and the expected payload. It's crucial to ensure that the game can be reset to its initial state correctly. 
// Testing saveGameSucceeded Action Creator: Like resetGameSucceeded, this test checks that saveGameSucceeded creates an action signalling that the game state has been successfully saved, with the type 'SAVE_GAME_SUCCEEDED'. 
// This action doesn't need a payload because the act of saving is either successful or not, which the action type adequately represents. 
// Testing setGamemodeActionSucceeded Action Creator: This test confirms that setGamemodeActionSucceeded dispatches an action to update the game mode, including the mode in the payload. It ensures that the game can transition between different modes (e.g., easy, hard) as expected. 
// Testing updateTimeSucceeded, updateMoneySucceeded, and updateSubTotalSucceeded Action Creators: These tests validate that each action creator correctly produces actions for updating the game's time, money, and subtotal values. 
// Each test checks for the correct action type and payload, ensuring that the game state updates occur as intended. 
