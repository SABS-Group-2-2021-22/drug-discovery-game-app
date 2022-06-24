import * as api from "../api";

export const analysisActions = {
  constructPlotObj,
  fetchSpiderObj,
  fetchCompText,
  fetchSpiderObjSucceeded,
  fetchCompTextSucceeded,
};

/**
 * Synchronous action that sends the plot data to the store
 * @param {state object} plot_data the assay data required for plotting
 * @returns the comparison plot's data for a state change by the analysisReducer
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
 * Asynchronous action that constructs the data object for the plot from the saved_mols
 * object
 * @param {state object} saved_mols the object contianing information on drug properties and descriptors
 * @returns dispatches constructPlotObjSucceeded with the plotting data
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
      //for each assay and its value
      if (K in assays_run) {
        //if assay has ben run
        assay_obj[K] = V; //append to the assay object
      }
    }
    if (v.data.assays_run.descriptors) {
      //if descriptors have been calculated
      var descriptor_obj = v.data.descriptors; //store descriptors has variable
    } else {
      var descriptor_obj = {}; //if not, use an empty object for descriptors
    }
    let blank = { "--": 0 }; //first xy axes shown (0, 0)
    let metrics = {
      ...assay_obj,
      ...descriptor_obj,
      ...blank,
    };
    plot_data[k] = metrics;
  }
  return (dispatch) => {
    dispatch(constructPlotObjSucceeded(plot_data)); //dispatch synchronous constructPlotObjSucceedeed action with the data
  };
}

/**
 * Synchronous action that sends the spider plot data to the store when dispatched
 * @param {state object} spider_data the data object contianing the spider plot data
 * @returns the spider plot's data for a state change by the analysisReducer
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
 * Asynchronous action that fires an api call to fetch data for the spider plot and
 * dispatches the fetchSpiderObjSucceeded action
 * @returns dispatches fetchSpiderObjSucceeded with the spider plot data
 */
function fetchSpiderObj() {
  return (dispatch) => {
    api.fetchSpiderObj().then((response) => {
      //fires api call to fetch spider data
      dispatch(fetchSpiderObjSucceeded(response)); //dispatches fetchSpiderObjSucceeded with this data
    });
  };
}

/**
 * Synchronous action that sends the comparison text to the store when dispatched
 * @param {state object} comp_text the comparison text
 * @returns the compairson text for a state change by the analysis reducer
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
 * Asynchronous action that fires an api call to fetch the text that compares drugs,
 * and dispatches the fecthCompTextSucceeded action
 * @returns dispatches fetchCompTextSucceeded with the comparison text
 */
function fetchCompText() {
  return (dispatch) => {
    api.fetchCompText().then((response) => {
      //fires api call to fetch the text
      dispatch(fetchCompTextSucceeded(response)); //dispatches fetchCompTextSucceeded
    });
  };
}
