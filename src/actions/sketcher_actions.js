import * as api from "../api";

import { selectorActions } from "./selector_actions";
import { analysisActions } from "./analysis_actions";

export const sketcherActions = {
  saveSketchedMolecule,
  closePopUp,
  runSketchedAssay,
  constructPlotObjSketcher,
  chooseSketchedMolecule,
  postSketchedChosen,
  fetchSketchedSpiderObj,
  fetchSketchedCompText,
};

/**
 * Asynchronous action that fires an api call to fetch the sketched molecule data,
 * and dispatches saveSketchedMoleculeSucceeded to store the molecule
 * @param {string} smiles smile string for the sketched molecule
 * @param {object} mol_block
 * @param {state object} saved_mols the object containing saved molecules and their data
 * @returns dispatches saveSketchedMoleculeSucceeded with saved_mols if the api call returns data. If not,
 * saveSketchedMoleculeFailed is dispatched
 */
function saveSketchedMolecule(smiles, mol_block, saved_mols) {
  return (dispatch) => {
    api.fetchsketchedMolecule(mol_block).then((response) => {
      //fires api call to fetch molecule data
      const molecule = response;
      if (molecule.data !== "failure") {
        //if there is valid molecule data
        saved_mols[smiles] = molecule; //store data using the smile string as a molecule key
        dispatch(saveSketchedMoleculeSucceeded(saved_mols));
      } else {
        dispatch(saveSketchedMoleculeFailed());
      }
    });
  };
}

/**
 * Synchronous action that sends the saved_mols object to the store when dispatched
 * @param {state object} saved_mols the object containing saved molecules
 * @returns saved_mols object for a state change by the assayReducer
 */
function saveSketchedMoleculeSucceeded(saved_mols) {
  return {
    type: "SAVE_SKETCHED_MOLECULE_SUCCEEDED",
    payload: {
      saved_mols: saved_mols,
    },
  };
}

/**
 * Synchronous action that sends a fail signal to the sketcherReducer
 * @returns binary error signal
 */
function saveSketchedMoleculeFailed() {
  return {
    type: "SAVE_SKETCHED_MOLECULE_FAILED",
    payload: {
      sketcher_error: 1,
    },
  };
}

/**
 *
 * @returns Dispatches the closePopUpSucceeded synchronous action
 */
function closePopUp() {
  return (dispatch) => {
    dispatch(closePopUpSucceeded());
  };
}

/**
 * Synchronous action that sends a closed pop up signal when dispatched
 * @returns binary success signal for the sketcherReducer
 */
function closePopUpSucceeded() {
  return {
    type: "POPUP_CLOSED_SUCCEEDED",
    payload: {
      sketcher_error: 0,
    },
  };
}

function runSketchedAssay(selected_mol, assays) {
  return (dispatch) => {
    dispatch(runSketchedAssaySucceeded(selected_mol, assays));
  };
}

/**
 * Synchronous action that sends the selected molecule and the run assays object when dispatched
 * @param {state object} selected_mol the selected molecule
 * @param {state object} assays the object containing the molecule's assay data
 * @returns the selected molecule and its run assays for the sketcherReducer
 */
function runSketchedAssaySucceeded(selected_mol, assays) {
  return {
    type: "RUN_SKETCHED_ASSAY_SUCCEEDED",
    payload: {
      molecule: selected_mol,
      assays_run: assays,
    },
  };
}

/**
 * Synchronous action that sends the plot data to the store
 * @param {state object} plot_data the assay data required for plotting
 * @returns the comparison plot's data for a state change by the analysisReducer
 */
function constructPlotObjSketcherSucceeded(plot_data) {
  return {
    type: "CONSTRUCT_PLOT_OBJECT_SUCCEEDED",
    payload: {
      plot_data: plot_data,
    },
  };
}

/**
 * Asynchronous action that constructs the data object for the plot from the saved_mols
 * object
 * @param {state object} saved_mols the object contianing information on drug properties and descriptors
 * @returns dispatches constructPlotObjSucceeded with the plotting data
 */
function constructPlotObjSketcher(saved_sketched_mols) {
  let plot_data = {};
  for (const [k, v] of Object.entries(saved_sketched_mols)) {
    let assay_obj = {};
    const assays_run = Object.keys(v.data.assays_run).reduce(
      (c, k) => ((c[k.toLowerCase().trim()] = v.data.assays_run[k]), c),
      {}
    );
    for (const [K, V] of Object.entries(v.data.drug_props)) {
      //for each property and its value
      if (K in assays_run) {
        //if assay has been run
        assay_obj[K] = V; //append to the assay object
      }
    }
    if (v.data.assays_run.descriptors) {
      //if descriptors have been calculated
      var descriptor_obj = v.data.descriptors; //store that molecule's descriptors as a variable
    } else {
      var descriptor_obj = {}; //if not, use an empty object
    }
    if (v.data.assays_run.tanimoto) {
      //if tanimoto coefficient have been calculated
      var tanimoto_obj = { tanimoto: v.data.tanimoto }; //store in object
    } else {
      var tanimoto_obj = {}; //if not, use an empty object
    }
    let blank = { "--": 0 }; //first xy axes shown (0, 0)
    let metrics = {
      ...assay_obj,
      ...descriptor_obj,
      ...tanimoto_obj,
      ...blank,
    };
    plot_data[k] = metrics;
  }
  return (dispatch) => {
    dispatch(constructPlotObjSketcherSucceeded(plot_data));
  }; //dispatch the synchronous constructPlotObjSketcherSucceeded action with the data
}

/**
 *
 * @param {string} id
 * @param {string} smiles
 * @returns
 */
function chooseSketchedMolecule(id, smiles) {
  return async (dispatch) => {
    dispatch(chooseSketchedMoleculeSucceeded(id, smiles));
    await api.postSketchedChosen(id, smiles);
    dispatch(postSketchedChosenSucceeded());
  };
}

/**
 * Synchronous action that sends the chosen molecule's id and smile string to the store when dispatched
 * @param {string} id the molecule's id
 * @param {string} smiles the molecule's smile string
 * @returns
 */
function chooseSketchedMoleculeSucceeded(id, smiles) {
  return {
    type: "CHOOSE_SKETCHED_MOLECULE_SUCCEEDED",
    payload: {
      chosen_mol: [id, smiles],
    },
  };
}

function postSketchedChosen(id, smiles) {
  return async (dispatch) => {
    const { post_chosen } = await api.postChosen(id, smiles);
    await dispatch(selectorActions.postChosenSucceeded());
    await api.fetchSketchedSpiderObj().then((response) => {
      dispatch(analysisActions.fetchSpiderObjSucceeded(response));
    });
    await api.fetchSketchedCompText().then((response) => {
      dispatch(analysisActions.fetchCompTextSucceeded(response));
    });
  };
}

function postSketchedChosenSucceeded() {
  return {
    type: "POST_SKETCHED_CHOSEN_SUCCEEDED",
  };
}

function fetchSketchedSpiderObj() {
  return (dispatch) => {
    api.fetchSketchedSpiderObj().then((response) => {
      dispatch(analysisActions.fetchSpiderObjSucceeded(response));
    });
  };
}

function fetchSketchedCompText() {
  return (dispatch) => {
    api.fetchSketchedCompText().then((response) => {
      dispatch(analysisActions.fetchCompTextSucceeded(response));
    });
  };
}
