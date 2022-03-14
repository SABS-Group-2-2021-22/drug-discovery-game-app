import * as api from "../api";

export const selectorActions = {
  selectRGroup,
  selectMolecule,
  chooseMolecule,
  postChosenSucceeded,
};

function selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule) {
  return {
    type: "SEL_R_FETCH_MOL_SUCCEEDED",
    payload: {
      r_group_id_A: r_group_id_A,
      r_group_id_B: r_group_id_B,
      molecule: molecule,
    },
  };
}

function selectRGroup(r_group_id_A, r_group_id_B, size) {
  return (dispatch) => {
    api.fetchMolecule(r_group_id_A, r_group_id_B, size).then((response) => {
      const molecule = response;
      dispatch(selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule));
    });
  };
}

function selectMolecule(selected_mol) {
  return (dispatch) => {
    dispatch(selectMoleculeSucceeded(selected_mol));
  };
}

function selectMoleculeSucceeded(selected_mol) {
  return {
    type: "SELECT_MOLECULE_SUCCEEDED",
    payload: {
      selected_mol: selected_mol,
    },
  };
}

function chooseMoleculeSucceeded(selected_mol) {
  return {
    type: "CHOOSE_MOLECULE_SUCCEEDED",
    payload: {
      chosen_mol: selected_mol,
    },
  };
}

function chooseMolecule(selected_mol) {
  return async (dispatch) => {
    dispatch(chooseMoleculeSucceeded(selected_mol));
    const r_group_A = selected_mol.slice(0, 3);
    const r_group_B = selected_mol.slice(3, 6);
    await api.postChosen(r_group_A, r_group_B);
    dispatch(postChosenSucceeded());
  };
}

function postChosenSucceeded() {
  return {
    type: "POST_CHOSEN_SUCCEEDED",
  };
}
