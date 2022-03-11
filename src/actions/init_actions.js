import * as api from "../api";

export const initActions = {
  fetchRGroup,
  fetchRoche,
};

function fetchRGroupSucceeded(r_group_obj) {
  return {
    type: "FETCH_R_GROUP_SUCCEEDED",
    payload: {
      r_groups: r_group_obj,
    },
  };
}

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

export function fetchRocheSucceeded(Roche) {
  return {
    type: "FETCH_ROCHE_SUCCEEDED",
    payload: {
      Roche: Roche,
    },
  };
}

export function fetchRoche() {
  return (dispatch) => {
    api.fetchMolecule("A05", "B07", "800,800").then((response) => {
      dispatch(fetchRocheSucceeded(response));
    });
  };
}