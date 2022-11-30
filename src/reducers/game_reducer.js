const initialState = {
  time: 30.0,
  money: 100000.0,
  subtotal: 0,
  gamemode: 'builder',
};

/**
 * This reducer controls the time, money, and game mode stores
 * @param {state object} state The states of time and moeny
 * @param {action} action Actions that update time, money, or game mode
 * @returns {state} updated time, money, and game mode state
 */
export function gameReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_TIME_SUCCEEDED": {
      return {
        ...state,
        time: action.payload.time,
      };
    }
    case "UPDATE_MONEY_SUCCEEDED": {
      return {
        ...state,
        money: action.payload.money,
      };
    }
    case "UPDATE_SUBTOTAL_SUCCEEDED": {
      return {
        ...state,
        subtotal: action.payload.subtotal,
      };
    }
    case "GAME_MODE_SET": {
      return {
        ...state,
        gamemode: action.payload.gamemode,
      };
    }
    default: {
      return state;
    }
  }
}
