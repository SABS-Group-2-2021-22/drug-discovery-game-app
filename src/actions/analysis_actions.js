export const analysisActions = {
  constructPlotObj,
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
  let plot_data = {};
  for (const [k, v] of Object.entries(saved_mols)) {
    let assay_obj = {};
    const assays_run = Object.keys(v.data.assays_run).reduce(
      (c, k) => {
          return ((c[k.toLowerCase().trim()] = v.data.assays_run[k]), c)},
      {}
    );
    for (const [K, V] of Object.entries(v.data.drug_props)) {
      if (K in assays_run) {
        assay_obj[K] = V;
      }
    }
    // add descriptors to plot data (are run no matter what)
    var descriptor_obj = v.data.descriptors;

    let blank = { "--": 0 }; //initial 'blank' data plotted on page load
    let metrics = {
      ...assay_obj,
      ...descriptor_obj,
      ...blank,
    };
    plot_data[k] = metrics;
  }
  return (dispatch) => {
    dispatch(constructPlotObjSucceeded(plot_data));
  };
}
