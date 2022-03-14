import * as api from "../api";

export const analysisActions = {
  constructPlotObj,
  fetchSpiderObj,
  fetchCompText,
};

function constructPlotObjSucceeded(plot_data) {
  return {
    type: "CONSTRUCT_PLOT_OBJECT_SUCCEEDED",
    payload: {
      plot_data: plot_data,
    },
  };
}

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
    if (v.data.assays_run.descriptors) {
      var descriptor_obj = v.data.descriptors;
    } else {
      var descriptor_obj = {};
    }
    let blank = { "--": 0 };
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

function fetchSpiderObjSucceeded(spider_data) {
  return {
    type: "FETCH_SPIDER_SUCCEEDED",
    payload: {
      spider_data: spider_data,
    },
  };
}

function fetchSpiderObj() {
  return (dispatch) => {
    api.fetchSpiderObj().then((response) => {
      dispatch(fetchSpiderObjSucceeded(response));
    });
  };
}

function fetchCompTextSucceeded(comp_text) {
  return {
    type: "FETCH_COMP_TEXT_SUCCEEDED",
    payload: {
      comp_text: comp_text,
    },
  };
}

function fetchCompText() {
  return (dispatch) => {
    api.fetchCompText().then((response) => {
      dispatch(fetchCompTextSucceeded(response));
    });
  };
}
