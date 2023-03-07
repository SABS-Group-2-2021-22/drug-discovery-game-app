import * as api from "../api";

export const analysisActions = {
  constructPlotObj,
  fetchSpiderObj,
  fetchCompText,
  fetchSpiderObjSucceeded,
  fetchCompTextSucceeded,
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
      (c, k) => ((c[k.toLowerCase().trim()] = v.data.assays_run[k]), c),
      {}
    );
    for (const [K, V] of Object.entries(v.data.drug_props)) {
      if (K in assays_run) {
        assay_obj[K] = V;
      }
    }
    // add descriptors to plot data (are run no matter what)
    {var descriptor_obj = v.data.descriptors;} 

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

/**
 * Synchronous action that sends spider plot data to the store when dispatched
 * @param {state object} plot_data the spider data plotted
 * @returns the spider plot data
 */
function fetchSpiderObjSucceeded(spider_data) {
  return {
    type: "FETCH_SPIDER_SUCCEEDED",
    payload: {
      spider_data: spider_data,
    },
  };
}

/**
 * An asynchronous action that fires an api call to fetch spider data from the BE
 * @param {}
 * @returns {dispatch} dispatches fetchSpiderObjectSucceeded to the analysisReducer
 */
function fetchSpiderObj() {
  return (dispatch) => {
    api.fetchSpiderObj().then((response) => {
      dispatch(fetchSpiderObjSucceeded(response));
    });
  };
}

/**
 * Synchronous action that sends the comparison text to the store when dispatched
 * This happens once the final molecule is submitted to reduce lag on the results page
 * @param {state object} comparison_text text comparing chosen and target molecules
 * @returns comparison text
 */
function fetchCompTextSucceeded(comp_text) {
  return {
    type: "FETCH_COMP_TEXT_SUCCEEDED",
    payload: {
      comp_text: comp_text,
    },
  };
}

/**
 * An asynchronous action that fires an api call to fetch comparison from the BE
 * @param {}
 * @returns {dispatch} dispatches fetchCompTextSucceeded to the analysisReducer
 */
function fetchCompText() {
  return (dispatch) => {
    api.fetchCompText().then((response) => {
      dispatch(fetchCompTextSucceeded(response));
    });
  };
}
