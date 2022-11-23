import * as api from "../api";

export const assayActions = {
  saveMolecule,
  runAssay,
  calcAssay,
  toggleHelp,
  invoiceDisplay,
  showInvoice,
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
function saveMolecule(saved_mols, selected_r_groups) {
  const mol_id = selected_r_groups.A + selected_r_groups.B; //create molecule id
  saved_mols[mol_id] = selected_r_groups.molecule; //inserts the molecule into the local saved_mols object
  saved_mols[mol_id].data.toggle_assay = {pIC50: false, clearance_mouse: false, clearance_human: false, logd:false, pampa:false} // anissa changes: add initial state for toggle_assay when you save the molecule
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
      .fetchLipinski(selected_r_groups.A, selected_r_groups.B) //fire api call to fetch the filters
      .then((response) => {
        let lipinski = response.data.lipinski[mol_id];
        dispatch(fetchLipinskiSucceeded(mol_id, lipinski));
      }); // dispatch fetchFiltersSucceeded synchronous action with the filters
  };
}

function showInvoiceSucceeded(invoice) {
  return {
    type: 'SHOW_INVOICE_SUCCEEDED',
    payload: {
      invoice: invoice
    }
  }
}

function showInvoice() {
  return async (dispatch) => {
    api.showInvoice().then((response)=>{
      dispatch(showInvoiceSucceeded(response.data.placeholder))
    })
  }
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

function calcAssaySucceeded(selected_mol, assays) {
  return {
    type: "CALC_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      toggle_assay: assays,
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
// invoice display
function invoiceDisplaySucceeded(bool) {
  return {
    type: "INVOICE_DISPLAY_SUCCEEDED",
    payload: {
      Bool: bool,
    },
  };
}

function invoiceDisplay(bool) {
  return (dispatch) => {
    dispatch(invoiceDisplaySucceeded(bool));
  };
}


/* anissa changes */
function toggleAssaySucceeded(selected_mol,button,bool) {
  return {
    type: "TOGGLE_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      button: button,
      bool: bool,
    },
  };
}

function toggleAssay(selected_mol,button,bool) {
  return (dispatch) => {
    dispatch(toggleAssaySucceeded(selected_mol,button,bool));
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

function calcAssay(selected_mol, assays) {
  return (dispatch) => {
    dispatch(calcAssaySucceeded(selected_mol, assays));
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