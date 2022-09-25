import * as api from "../api";

export const initActions = {
  fetchRGroup,
  fetchRoche,
};

/**
 * Synchronous action that sends the r group object to the store when dispatched
 * @param {state object} r_group_obj the r_group state object
 * @returns {} the r_group object for a state change by the initReducer
 */
function fetchRGroupSucceeded(r_group_obj) {
  return {
    type: "FETCH_R_GROUP_SUCCEEDED",
    payload: {
      r_groups: r_group_obj,
    },
  };
}

/**
 * An asynchronous action that creates an r group object with all r group
 * data retrieved via api calls (less than id of 10 + greater than/equal id of 10).
 * Called on the home page to reduce lag on the builder page
 * @param {}
 * @returns {dispatch} dispatches fetchRGroupSucceeded with the r group object
 */
function fetchRGroup() {
  const positions = ["A", "B"];
  var r_group_obj = {};
  for (const pos of positions) {
    for (let i = 1; i < 51; i++) {
      if (i < 10) {
        let id = String(pos + 0 + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      } else {
        let id = String(pos + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      }
    }
  }
  return (dispatch) => {
    dispatch(fetchRGroupSucceeded(r_group_obj));
  };
}

/**
 * Synchronous action that sends the target compound to the store
 * @param {state object} Roche Roche's chosen molecule
 * @returns {} Roche's chosen molecule for a state change by the initReducer
 */
export function fetchRocheSucceeded(Roche) {
  return {
    type: "FETCH_ROCHE_SUCCEEDED",
    payload: {
      Roche: Roche,
    },
  };
}

/**
 * An asynchronous action that fires an api call to fetch the target compound
 * (the one Roche chose)
 * @param {}
 * @returns {dispatch} dispatches fetchRocheSucceeded with the r group object
 */
export function fetchRoche() {
  return (dispatch) => {
    api.fetchMolecule("A05", "B07", "800,800").then((response) => {
      dispatch(fetchRocheSucceeded(response));
    });
  };
}
