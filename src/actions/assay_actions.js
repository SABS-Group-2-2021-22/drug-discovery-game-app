import * as api from "../api";

export const assayActions = {
  saveMolecule,
  runAssay,
  toggleHelp,
};

/**
 * Synchronous action that sends the saved_mols object to the store when dispatched
 * @param {state object} saved_mols the saved_mols state object
 * @returns {} the saved_mols object for a state change by the assayReducer
 */
function saveMoleculeSucceeded(saved_mols) {
  return {
    type: "SAVE_MOLECULE_SUCCEEDED",
    payload: {
      saved_mols: saved_mols,
    },
  };
}

/**
 * An asynchronous action that creates a molecule id from the selected r groups,
 * fires an api call with the selected r groups, fires api calls to fetch all data for the molecule,
 * and dispatches the saveMoleculeSucceeded, fetchDescriptorsSucceeded, and fetchFiltersSucceeded actions
 * @param {state object} saved_mols the current saved_mols object
 * @param {object} selected_r_groups the selected r groups object, containing r group A and B
 * @returns {dispatch} dispatches saveMolecule succeeded, fetchDescriptorsSucceeded, and fetchFiltersSucceeded
 * for the assayReducer
 */
function saveMolecule(saved_mols, selected_r_groups) {
  const mol_id = selected_r_groups.A + selected_r_groups.B; //create molecule id
  saved_mols[mol_id] = selected_r_groups.molecule; //inserts the molecule into the local saved_mols object
  return async (dispatch) => {
    const { post_saved } = await api.postSaved(
      selected_r_groups.A,
      selected_r_groups.B
    ); //send saved r groups to the backend
    await dispatch(saveMoleculeSucceeded(saved_mols)); //wait until the molecule has been saved
    api
      .fetchDescriptors(selected_r_groups.A, selected_r_groups.B) //fire api call to fetch the descriptors
      .then((response) => {
        let descriptors = response.data.descriptors[mol_id];
        dispatch(fetchDescriptorsSucceeded(mol_id, descriptors));
      }); // dispatch fetchDescriptorsSucceeded synchronous action with the descriptors
    api
      .fetchFilters(selected_r_groups.A, selected_r_groups.B) //fire api call to fetch the filters
      .then((response) => {
        let filters = response.data.lipinski[mol_id];
        dispatch(fetchFiltersSucceeded(mol_id, filters));
      }); // dispatch fetchFiltersSucceeded synchronous action with the filters
  };
}

/**
 * Synchronous action that sends the selected_mol and assays object to the assayReduxer
 * @param {state object} selected_mol the selected molecule
 * @param {state object} assays the assays object containing the assays_run object
 * @returns the selected_mol and assays object for a state change by the assayReducer
 */
function runAssaySucceeded(selected_mol, assays) {
  return {
    type: "RUN_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      assays_run: assays,
    },
  };
}

function toggleHelpSucceeded(bool) {
  return {
    type: "TOGGLE_HELP_SUCCEEDED",
    payload: {
      Bool: bool,
    },
  };
}

function toggleHelp(bool) {
  return (dispatch) => {
    dispatch(toggleHelpSucceeded(bool));
  };
}

/**
 * Asynchronous action that dispactes the runAssaySucceeded action
 * @param {state object} selected_mol the selected molecule
 * @param {state object} assays the assays object for a stange change
 * @returns dispacthes runAssaySucceeded
 */
function runAssay(selected_mol, assays) {
  return (dispatch) => {
    dispatch(runAssaySucceeded(selected_mol, assays));
  };
}

/**
 * Synchronous action that sends the molecule and its descriptors to the assayReducer
 * @param {state object} mol the molecule
 * @param {state object} descriptors the descriptors object of the molecule
 * @returns the molecule and its descriptors for a state change
 */
function fetchDescriptorsSucceeded(mol, descriptors) {
  return {
    type: "FETCH_DESCRIPTORS_SUCCEEDED",
    payload: {
      molecule: mol,
      descriptors: descriptors,
    },
  };
}

/**
 * Synchronous action that sends the molecule and its filters to the assayReducer
 * @param {state object} mol the molecule
 * @param {state object} filters the filters of the molecule
 * @returns the molecule and its filters for a state change
 */
export function fetchFiltersSucceeded(mol, filters) {
  return {
    type: "FETCH_FILTERS_SUCCEEDED",
    payload: {
      molecule: mol,
      filters: filters,
    },
  };
}
