import * as api from "../api";

export function fetchRGroupSucceeded(r_group_obj) {
  return {
    type: "FETCH_R_GROUP_SUCCEEDED",
    payload: {
      r_groups: r_group_obj,
    },
  };
}

export function fetchRGroup() {
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
  console.log(r_group_obj);
  return (dispatch) => {
    dispatch(fetchRGroupSucceeded(r_group_obj));
  };
}

export function selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule) {
  return {
    type: "SEL_R_FETCH_MOL_SUCCEEDED",
    payload: {
      r_group_id_A: r_group_id_A,
      r_group_id_B: r_group_id_B,
      molecule: molecule,
    },
  };
}

export function selectRGroup(r_group_id_A, r_group_id_B, size) {
  return (dispatch) => {
    api.fetchMolecule(r_group_id_A, r_group_id_B, size).then((response) => {
      const molecule = response;
      dispatch(selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule));
    });
  };
}


export function saveMoleculeSucceeded(molecule) {
  return {
    type: "SAVE_MOLECULE_SUCCEEDED",
    payload: {
      saved_mol: molecule
    }
  }
}

export function saveMolecule(selected_r_groups) {
  console.log(selected_r_groups) 
  const id = selected_r_groups.A + selected_r_groups.B
  let molecule = {}
  molecule[id] = selected_r_groups.molecule
  console.log(molecule)
    return(dispatch) => {
      dispatch(saveMoleculeSucceeded(molecule))
    }
} 