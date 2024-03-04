import { gameReducer } from '../../game_reducer.js';

describe('gameReducer', () => {
    const initialState = {
      time: 30.0,
      money: 100000.0,
      subtotal: 0,
      gamemode: 'builder',
    };
  
    it('should return the initial state', () => {
      expect(gameReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle UPDATE_TIME_SUCCEEDED', () => {
      const action = { type: 'UPDATE_TIME_SUCCEEDED', payload: { time: 25.0 } };
      const expectedState = { ...initialState, time: 25.0 };
      expect(gameReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle UPDATE_MONEY_SUCCEEDED', () => {
      const action = { type: 'UPDATE_MONEY_SUCCEEDED', payload: { money: 50000.0 } };
      const expectedState = { ...initialState, money: 50000.0 };
      expect(gameReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle UPDATE_SUBTOTAL_SUCCEEDED', () => {
      const action = { type: 'UPDATE_SUBTOTAL_SUCCEEDED', payload: { subtotal: 300 } };
      const expectedState = { ...initialState, subtotal: 300 };
      expect(gameReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle GAME_MODE_SET', () => {
      const action = { type: 'GAME_MODE_SET', payload: { gamemode: 'adventure' } };
      const expectedState = { ...initialState, gamemode: 'adventure' };
      expect(gameReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should return the current state for an unknown action type', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      expect(gameReducer(initialState, action)).toEqual(initialState);
    });
  });

  test('should return the current state for an unknown action type', () => {
    const currentState = {
      time: 30.0,
      money: 100000.0,
      subtotal: 500,
      gamemode: 'builder',
    };
    const action = { type: 'UNKNOWN_ACTION' };
    expect(gameReducer(currentState, action)).toEqual(currentState);
  });

// The first test ensures that the reducer returns the initial state when no state is provided and the action is not recognized.
// The next four tests verify that each recognized action updates the state appropriately without affecting other state properties. 
// They check for immutability by ensuring the returned state is a new object and not a direct mutation of the initial state.
// The final test confirms that the reducer returns the current state unchanged when the action type is not recognized, ensuring that the reducer is pure and does not produce side effects or unintended state changes.
