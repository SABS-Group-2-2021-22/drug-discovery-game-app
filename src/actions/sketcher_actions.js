import * as api from "../api";

import { selectorActions } from "./selector_actions"
import { analysisActions } from './analysis_actions'

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

 function saveSketchedMolecule(smiles, mol_block, saved_mols) {
    return (dispatch) => {
      api.fetchsketchedMolecule(mol_block).then((response) => {
        const molecule = response;
        if (molecule.data !== 'failure') {
          saved_mols[smiles] = molecule
          dispatch(saveSketchedMoleculeSucceeded(saved_mols));
        }
        else {
          dispatch(saveSketchedMoleculeFailed());
        }
  
      })
    };
  }
  
   function saveSketchedMoleculeSucceeded(saved_mols) {
    return {
      type: "SAVE_SKETCHED_MOLECULE_SUCCEEDED",
      payload: {
        saved_mols: saved_mols
      }
  }
  }
  
   function saveSketchedMoleculeFailed() {
    return {
      type: "SAVE_SKETCHED_MOLECULE_FAILED",
      payload: {
        sketcher_error: 1
      }
  }
  }
  
   function closePopUp() {
    return (dispatch) => {
          dispatch(closePopUpSucceeded());
  
      }
    };
  
   function closePopUpSucceeded() {
    return {
      type: 'POPUP_CLOSED_SUCCEEDED',
      payload: {
        sketcher_error: 0,
      },
    }
  }
  
   function runSketchedAssay(selected_mol, assays) {
    return (dispatch) => {
      dispatch(runSketchedAssaySucceeded(selected_mol, assays));
    }
  }
  
   function runSketchedAssaySucceeded(selected_mol, assays) {
    return {
      type: 'RUN_SKETCHED_ASSAY_SUCCEEDED',
      payload: {
        molecule: selected_mol,
        assays_run: assays,
      },
  }
  } 
  
   function constructPlotObjSketcherSucceeded(plot_data) {
    return {
      type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
      payload: {
        plot_data: plot_data
      }
    }
  }
  
   function constructPlotObjSketcher(saved_sketched_mols) {
    let plot_data = {};
    for (const [k, v] of Object.entries(saved_sketched_mols)) {
      let assay_obj = {};
      const assays_run = Object.keys(v.data.assays_run).reduce(
        (c, k) => {
          c[k.toLowerCase().trim()] = v.data.assays_run[k];
          return c;
        }
      );
      for (const [K, V] of Object.entries(v.data.drug_props)) {
        if (K in assays_run) {
          assay_obj[K] = V;
        }
      }
      var descriptor_obj = {};
      if (v.data.assays_run.descriptors) {
        descriptor_obj = v.data.descriptors;
      }
      var tanimoto_obj = {}; 
      if (v.data.assays_run.tanimoto) {
        tanimoto_obj = {tanimoto: v.data.tanimoto};
      }
      let blank = { "--": 0 };
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
    };
  }
  
   function chooseSketchedMolecule(id, smiles) {
    return async (dispatch) => {
      dispatch(chooseSketchedMoleculeSucceeded(id, smiles));
      await api.postSketchedChosen(id, smiles)
      dispatch(postSketchedChosenSucceeded())
    };
  }
  
  
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