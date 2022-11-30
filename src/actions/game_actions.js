import * as api from "../api";

export const gameActions = {
  updateTime,
  updateMoney,
  resetGame,
  saveGame,
  setGamemodeAction,
  updateSubTotal,
};

/**
 * Synchronous action that sends the time to the store when dispatched
 * @param {state object} time the remaining time
 * @returns the time for a state change by the gameReducer
 */
function updateTimeSucceeded(time) {
  return {
    type: "UPDATE_TIME_SUCCEEDED",
    payload: {
      time: time,
    },
  };
}

/**
 * Asynchronous action that calculates the remaining time and
 * dispathces the updateTimeSucceeded action with the time object
 * @param {state object} assays the assay object containing assays_run
 * @param {state object} current_time the current time remaining
 * @returns dispatches updateTimeSucceeded with the new time
 */
function updateTime(assays, current_time) {
  var time_max = 0;
  const assay_times = {
    pIC50: 1.0,
    clearance_mouse: 3.0,
    clearance_human: 3.5,
    logd: 1.5,
    pampa: 1.0,
  }; //predefined number of weeks each assay (weeks)
  for (const i of assays) {
    for (const [k, v] of Object.entries(assay_times)) {
      if (i === k) {
        if (time_max < v) {
          time_max = v;
        }
         // take the maximum time value so assays run in
      }
    }
  }
  let time = current_time - time_max; //calculate new time
  return (dispatch) => {
    dispatch(updateTimeSucceeded(time));
  }; //dispatch time to the store via the updateTimeSucceeded synchronous action
}

/**
 * Synchronous action that sends the money left to the store when dispatched
 * @param {state object} money the remaining money
 * @returns the money left for a state change by the gameReducer
 */
function updateMoneySucceeded(money) {
  return {
    type: "UPDATE_MONEY_SUCCEEDED",
    payload: {
      money: money,
    },
  };
}

function updateSubTotalSucceeded(subtotal) {
  return {
    type: "UPDATE_SUBTOTAL_SUCCEEDED",
    payload: {
      subtotal: subtotal,
    },
  };
}

/**
 * Asynchronous action that calculates the remaining money
 * and dispatches updateMoneySucceeded with the money object
 * @param {state object} assays the assay object containing assays_run
 * @param {state_object} current_money the current money remaining
 * @returns dispatches updateMoneySucceeded with the new amount of money
 */
function updateMoney(assays, current_money) {
  let cost_sum = 0;
  const assay_prices = {
    pIC50: 70.0,
    clearance_mouse: 7000.0,
    clearance_human: 9000.0,
    logd: 1000.0,
    pampa: 700.0,
  }; //predfined cost of each assay
  for (const i of assays) {
    for (const [k, v] of Object.entries(assay_prices)) {
      if (i === k) {
          cost_sum += v; //add money for each assay to total cost
        }
      }
    }
  let money = current_money - cost_sum; //calculate new amount of money
  return (dispatch) => {
    dispatch(updateMoneySucceeded(money));
  }; //dispatch money to the store via the updateMoneySucceded synchronous action
} 

function updateSubTotal(assays, cost_sum) {
    console.log(assays)
    const assay_prices = {
      pIC50: 70.0,
      clearance_mouse: 7000.0,
      clearance_human: 9000.0,
      logd: 1000.0,
      pampa: 700.0,
    }; //predfined cost of each assay
    cost_sum = 0
    for (const i of assays) {
      for (const [k, v] of Object.entries(assay_prices)) {
        if (i === k) {
          cost_sum += v; //add money for each assay to total cost
          }
        }
      }
    return (dispatch) => {
      dispatch(updateSubTotalSucceeded(cost_sum));
    }; //dispatch money to the store via the updateMoneySucceded synchronous action
  }


/**
 * Synchronous action with no payload - simply sends a reset game signal to the rootReducer
 * @returns a type message only
 */
function resetGameSucceeded() {
  return {
    type: "RESET",
    payload: {
      saved_mols: {}
    }
  };
}

/**
 * Asynchronous action that fires an api call to reset the backend,
 * and dispatches resetGameSuceeded to the store
 * @returns a dispatch
 */
function resetGame() {
  return (dispatch) => {
    api.resetGame(); //fire api call
    dispatch(resetGameSucceeded()); //dispatch synchronous resetGameSucceeded action
  };
}

/**
 * Synchronous action with no payload - simply sends a save game signal
 */
function saveGameSucceeded() {
  return {
    type: "SAVE_GAME_SUCCEEDED",
  };
}

/**
 *
 * @returns Asychnronous action that fires a saveGame api call to back end
 * and dispatches saveGameSucceeded
 */
function saveGame() {
  return (dispatch) => {
    api.saveGame();
    dispatch(saveGameSucceeded());
  };
}

/**
 * Asychronous action that dispacthes the setGamemodeActionSucceeded
 * action with the game mode to the store
 * @param {state object} mode the chosen game mode
 * @returns a dispatch
 */
function setGamemodeAction(mode) {
  return (dispatch) => {
    dispatch(setGamemodeActionSucceeded(mode));
  };
}

/**
 * Synchronous action that sends the chosen game mode to the gameReducer
 * @param {state object} mode the chosen game mode
 * @returns the chosen game mode for the store
 */
function setGamemodeActionSucceeded(mode) {
  return {
    type: "GAME_MODE_SET",
    payload: {
      gamemode: mode,
    },
  };
}
