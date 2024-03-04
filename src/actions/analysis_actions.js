//import * as api from "../api"; - imported but not used

export const analysisActions = {
  constructPlotObj,
  constructPlotObjSucceeded,
};

/**
 * Synchronous action that sends plot data to the store when dispatched
 * @param {state object} plot_data the data plotted
 * @returns the plot data
 */
function constructPlotObjSucceeded(plot_data) {
  return {
    type: "CONSTRUCT_PLOT_OBJECT_SUCCEEDED",
    payload: {
      plot_data: plot_data,
    },
  };
}

/**
 * An asynchronous action that extracts drug properties, descriptor info,
 * and assay info from saved_mols and constructs the data object for plotting
 * @param {state object} saved_mols the saved_mols object
 * @returns {dispatch} dispatches constructuPlotObjectSucceeded to the analysisReducer
 */
function constructPlotObj(saved_mols) {
  return (dispatch) => {
    // Check if saved_mols is valid and has entries
    if (!saved_mols || typeof saved_mols !== 'object' || Object.keys(saved_mols).length === 0) {
      // If not, dispatch an action with an empty plot_data
      return dispatch(constructPlotObjSucceeded({}));
    }

    let plot_data = {};

    // Iterate over saved_mols to construct plot_data
    for (const [key, value] of Object.entries(saved_mols)) {
      // Initialize objects to collect assay and descriptor data
      let assay_obj = {};
      let descriptor_obj = {};
      let blank = { "--": 0 };

      // Check if necessary nested structures exist before accessing them
      if (value.data && value.data.assays_run && typeof value.data.assays_run === 'object') {
        const assays_run = Object.keys(value.data.assays_run).reduce(
          (acc, curr) => {
            acc[curr.toLowerCase().trim()] = value.data.assays_run[curr];
            return acc;
          },
          {}
        );

        // Process drug_props only if it exists and is an object
        if (value.data.drug_props && typeof value.data.drug_props === 'object') {
          for (const [propKey, propValue] of Object.entries(value.data.drug_props)) {
            let normalizedPropKey = propKey.toLowerCase().trim();
            if (normalizedPropKey in assays_run) {
              assay_obj[normalizedPropKey] = propValue;
            }
          }
        }
      }

      // Include descriptors if they exist
      if (value.data && value.data.descriptors && typeof value.data.descriptors === 'object') {
        descriptor_obj = value.data.descriptors;
      }

      // Construct the complete data object for this entry
      plot_data[key] = {
        ...assay_obj,
        ...descriptor_obj,
        ...blank,
      };
    }

    // Dispatch the action with constructed plot_data
    dispatch(constructPlotObjSucceeded(plot_data));
  };
}

