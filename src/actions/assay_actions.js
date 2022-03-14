import * as api from "../api";

export const assayActions = {
  saveMolecule,
  runAssay,
};

function saveMoleculeSucceeded(saved_mols) {
  return {
    type: "SAVE_MOLECULE_SUCCEEDED",
    payload: {
      saved_mols: saved_mols,
    },
  };
}

function saveMolecule(saved_mols, selected_r_groups) {
  const mol_id = selected_r_groups.A + selected_r_groups.B;
  saved_mols[mol_id] = selected_r_groups.molecule;
  return async (dispatch) => {
    const { post_saved } = await api.postSaved(
      selected_r_groups.A,
      selected_r_groups.B
    );
    await dispatch(saveMoleculeSucceeded(saved_mols));
    api
      .fetchDescriptors(selected_r_groups.A, selected_r_groups.B)
      .then((response) => {
        let descriptors = response.data.descriptors[mol_id];
        dispatch(fetchDescriptorsSucceeded(mol_id, descriptors));
      });
    api
      .fetchFilters(selected_r_groups.A, selected_r_groups.B)
      .then((response) => {
        let filters = response.data.lipinski[mol_id];
        dispatch(fetchFiltersSucceeded(mol_id, filters));
      });
  };
}

function runAssaySucceeded(selected_mol, assays) {
  return {
    type: "RUN_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      assays_run: assays,
    },
  };
}

function runAssay(selected_mol, assays) {
  return (dispatch) => {
    dispatch(runAssaySucceeded(selected_mol, assays));
  };
}

function fetchDescriptorsSucceeded(mol, descriptors) {
  return {
    type: "FETCH_DESCRIPTORS_SUCCEEDED",
    payload: {
      molecule: mol,
      descriptors: descriptors,
    },
  };
}

export function fetchFiltersSucceeded(mol, filters) {
  return {
    type: "FETCH_FILTERS_SUCCEEDED",
    payload: {
      molecule: mol,
      filters: filters,
    },
  };
}

