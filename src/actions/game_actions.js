import * as api from "../api";

export const gameActions = {
  updateTime,
  updateMoney,
  resetGame,
  saveGame,
  setGamemodeAction,
};

function updateTimeSucceeded(time) {
  return {
    type: "UPDATE_TIME_SUCCEEDED",
    payload: {
      time: time,
    },
  };
}

function updateTime(assays, current_time) {
  var time_sum = 0;
  const assay_times = {
    pIC50: 1.0,
    clearance_mouse: 3.0,
    clearance_human: 3.5,
    logd: 1.5,
    pampa: 1.0,
  };
  for (const i of assays) {
    for (const [k, v] of Object.entries(assay_times)) {
      if (i === k) {
        time_sum += v;
      }
    }
  }
  let time = current_time - time_sum;
  return (dispatch) => {
    dispatch(updateTimeSucceeded(time));
  };
}

function updateMoneySucceeded(money) {
  return {
    type: "UPDATE_MONEY_SUCCEEDED",
    payload: {
      money: money,
    },
  };
}

function updateMoney(assays, current_money) {
  let cost_sum = 0;
  const assay_prices = {
    pIC50: 70.0,
    clearance_mouse: 7000.0,
    clearance_human: 9000.0,
    logd: 1000.0,
    pampa: 700.0,
  };
  for (const i of assays) {
    for (const [k, v] of Object.entries(assay_prices)) {
      if (i === k) {
        cost_sum += v;
      }
    }
  }
  let money = current_money - cost_sum;
  return (dispatch) => {
    dispatch(updateMoneySucceeded(money));
  };
}

function resetGameSucceeded() {
  return {
    type: "RESET_GAME_SUCCEEDED",
  };
}

function resetGame() {
  return (dispatch) => {
    api.resetGame();
    dispatch(resetGameSucceeded());
  };
}


function saveGameSucceeded() {
  return {
    type: "SAVE_GAME_SUCCEEDED",
  };
}

function saveGame() {
  return (dispatch) => {
    api.saveGame();
    dispatch(saveGameSucceeded());
  };
}

function setGamemodeAction(mode) {
  return (dispatch) => {
        dispatch(setGamemodeActionSucceeded(mode));
    };
  }

function setGamemodeActionSucceeded(mode) {
  return {
    type: "GAME_MODE_SET",
    payload: {
      gamemode: mode
    }
  };
}