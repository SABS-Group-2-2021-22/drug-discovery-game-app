import * as api from "../api";

export const assayActions = {
  saveMolecule,
  runAssay,
  toggleHelp,
  toggleAssay
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
function saveMolecule(saved_mols, selected_r_groups, current_time) {
  const mol_id = selected_r_groups.A + selected_r_groups.B; //create molecule id
  saved_mols[mol_id] = selected_r_groups.molecule; //inserts the molecule into the local saved_mols object
  saved_mols[mol_id].data.toggle_assay = { pIC50: false, clearance_mouse: false, clearance_human: false, logd: false, pampa: false } // adds initial state for toggle_assay when you save the molecule
  saved_mols[mol_id].data.date_created = 30 - current_time
  return async (dispatch) => {
    await dispatch(saveMoleculeSucceeded(saved_mols)); //wait until the molecule has been saved
    api
      .fetchDescriptors(selected_r_groups.A, selected_r_groups.B) //fire api call to fetch the descriptors
      .then((response) => {
        let descriptors = response.data.descriptors[mol_id];
        dispatch(fetchDescriptorsSucceeded(mol_id, descriptors));
      }); // dispatch fetchDescriptorsSucceeded synchronous action with the descriptors
    api
      .fetchLipinski(selected_r_groups.A, selected_r_groups.B) //fire api call to fetch the filters
      .then((response) => {
        let lipinski = response.data.lipinski[mol_id];
        dispatch(fetchLipinskiSucceeded(mol_id, lipinski));
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

// Synchronous action that sends the boolean state of toggle help button to the store when dispatched
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
 * Synchronous action that sends the boolean values of toggled assay buttons to the assayReducer
 * @param {state object} selected_mol the selected molecule
 * @param {state object} assay_type the assay type of the toggle button
 * @param {state object} is_selected the true/false state of teh assay toggle
 * @returns the selected_mol, assay button, and its true/false state for a state change by the assayReducer
 */
function toggleAssaySucceeded(selected_mol, assay_type, is_selected) {
  return {
    type: "TOGGLE_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      assay_type: assay_type,
      is_selected: is_selected,
    },
  };
}
/**
 * Asynchronous action that dispatches the toggleAssaySucceeded action
 * @param {state object} selected_mol the selected molecule
 * @param {state object} assay_type the assay type of the toggle button
 * @param {state object} is_selected the true/false state of the assay toggle
 * @returns dispatches toggleAssaySucceeded
 */
function toggleAssay(selected_mol, assay_type, is_selected) {
  return (dispatch) => {
    dispatch(toggleAssaySucceeded(selected_mol, assay_type, is_selected));
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
 * @param {state object} lipinski whether the molecules passes Lipinski's Rule of 5 or not
 * @returns the molecule and its filters for a state change
 */
export function fetchLipinskiSucceeded(mol, lipinski) {
  return {
    type: "FETCH_LIPINSKI_SUCCEEDED",
    payload: {
      molecule: mol,
      lipinski: lipinski,
    },
  };
}