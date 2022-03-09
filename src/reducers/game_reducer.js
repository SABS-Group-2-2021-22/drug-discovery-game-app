const initialState = {
    time: 30.0,
    money: 100000.0
}

export function gameReducer(state=initialState, action) {
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
      case "RESET_GAME_SUCCEEDED": {
        return initialState;
      }
      default: {
        return state;
      }
    }
}