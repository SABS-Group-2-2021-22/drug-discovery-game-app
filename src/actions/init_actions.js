import * as api from "../api";

export const initActions = {
  fetchRGroup,
  fetchRoche,
};

/**
 * Synchronous action that sends the r_group object to the store when dispatched
 * @param {object} r_group_obj the object containing the r group
 * @returns the r group for a state change by initReducer
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
 * Asynchronous action that fires the fetchRGroup api call and
 * dispatches the fetchRGroupSucceeded action containing the r group object
 * @returns {dispatch} dispacthes fetchRGroupSucceeded with the r group object
 */
function fetchRGroup() {
  const positions = ["A", "B"];
  var r_group_obj = {};
  for (const pos of positions) {
    //for each r group position
    for (let i = 1; i < 51; i++) {
      //for every r group (ids 0-50)
      if (i < 10) {
        let id = String(pos + 0 + i); //create string id for the r groups 0-9
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        }); //fire the fetchRGroup api call with the r group id
      } else {
        let id = String(pos + i); //create string id for the r groups 10-50
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        }); //fire the fetchRGroup api call with the r group id
      }
    }
  }
  return (dispatch) => {
    dispatch(fetchRGroupSucceeded(r_group_obj));
  }; // dispatch the fetchRGroupSucceeded synchronous action
}

/**
 * Synchronous action that sends the Roche object to the store when dispatched
 * @param {object} Roche Roche's chosen molecule
 * @returns Roche's chosen molecule for a state change by initReducer
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
 * Asychronous action that fires the fetchMolecule api call with the
 * r group ids for Roche's chosen molecule and the size of the image
 * @returns {dispatch } dispatches fetchRocheSucceeded with Roche's chosen molcule
 */
export function fetchRoche() {
  return (dispatch) => {
    api.fetchMolecule("A05", "B07", "800,800").then((response) => {
      //fire fethcMolecule api call
      dispatch(fetchRocheSucceeded(response)); //dispatch the fetchRocheSucceeded synchronous action
    });
  };
}
