import * as api from "../api";

export function fetchRGroupSucceeded(r_group_obj) {
  return {
    type: "FETCH_R_GROUP_SUCCEEDED",
    payload: {
      r_groups: r_group_obj,
    },
  };
}

export function fetchRGroup() {
  const positions = ["A", "B"];
  var r_group_obj = {};
  for (const pos of positions) {
    for (let i = 1; i < 51; i++) {
      if (i < 10) {
        let id = String(pos + 0 + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      } else {
        let id = String(pos + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      }
    }
  }
  return (dispatch) => {
    dispatch(fetchRGroupSucceeded(r_group_obj));
  };
}

export function selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule) {
  return {
    type: "SEL_R_FETCH_MOL_SUCCEEDED",
    payload: {
      r_group_id_A: r_group_id_A,
      r_group_id_B: r_group_id_B,
      molecule: molecule,
    },
  };
}

export function selectRGroup(r_group_id_A, r_group_id_B, size) {
  return (dispatch) => {
    api.fetchMolecule(r_group_id_A, r_group_id_B, size).then((response) => {
      const molecule = response;
      dispatch(selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule));
    });
  };
}

export function saveMoleculeSucceeded(saved_mols) {
  return {
    type: "SAVE_MOLECULE_SUCCEEDED",
    payload: {
      saved_mols: saved_mols
    }
  };
}

export function fetchDescriptorsSucceeded(mol, descriptors) {
  return {
    type: "FETCH_DESCRIPTORS_SUCCEEDED",
    payload: {
      molecule: mol,
      descriptors: descriptors,
    },
  };
}

export function fetchFiltersSucceeded(mol, filters) {
  return {
    type: "FETCH_FILTERS_SUCCEEDED",
    payload: {
      molecule: mol,
      filters: filters,
    }
  }
}

export function saveMolecule(saved_mols, selected_r_groups) {
  const mol_id = selected_r_groups.A + selected_r_groups.B;
  saved_mols[mol_id] = selected_r_groups.molecule;
  return async (dispatch) => {
    const { post_saved } = await api.postSaved(
      selected_r_groups.A,
      selected_r_groups.B
    );
    await dispatch(saveMoleculeSucceeded(saved_mols));
    api.fetchDescriptors(selected_r_groups.A, selected_r_groups.B).then((response) => {
      let descriptors = response.data.descriptors[mol_id]
      dispatch(fetchDescriptorsSucceeded(mol_id, descriptors))
    });
    api.fetchFilters(selected_r_groups.A, selected_r_groups.B).then((response) => {
      let filters = response.data.lipinski[mol_id]
      dispatch(fetchFiltersSucceeded(mol_id, filters))
    })
  };
}

export function selectMoleculeSucceeded(selected_mol) {
  return {
    type: "SELECT_MOLECULE_SUCCEEDED",
    payload: {
      selected_mol: selected_mol,
    },
  };
}

export function selectMolecule(selected_mol) {
  return (dispatch) => {
    dispatch(selectMoleculeSucceeded(selected_mol));
  };
}

export function runAssaySucceeded(selected_mol, assays) {
  return {
    type: 'RUN_ASSAY_SUCCEEDED',
    payload: {
      molecule: selected_mol,
      assays_run: assays,
    },
  };
}

export function runAssay(selected_mol, assays) {
  return (dispatch) => {
    dispatch(runAssaySucceeded(selected_mol, assays));
  };
}

export function chooseMoleculeSucceeded(selected_mol) {
  return {
    type: 'CHOOSE_MOLECULE_SUCCEEDED',
    payload: {
      chosen_mol: selected_mol
    },
  };
}

export function chooseMolecule(selected_mol) {
  return (dispatch) => {
    dispatch(chooseMoleculeSucceeded(selected_mol));
  };
}

export function postChosen(selected_mol) {
  const r_group_A = selected_mol.slice(0, 3) 
  const r_group_B = selected_mol.slice(3, 6)
  return (
    api.postChosen(r_group_A, r_group_B)
  );
}

export function constructPlotObjSucceeded(plot_data) {
  return {
    type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
    payload: {
      plot_data: plot_data
    }
  }
}

export function constructPlotObj(saved_mols) {
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

export function saveSketchedMolecule(mol_block) {
  return (dispatch) => {
    api.fetchsketchedMolecule(mol_block).then((response) => {
      const molecule = response;
      dispatch(saveSketchedMoleculeSucceeded(molecule));
    })
  };
}

export function saveSketchedMoleculeSucceeded(molecule) {
  return {
    type: "SAVE_SKETCHED_MOLECULE_SUCCEEDED",
    payload: {
      saved_mol: molecule
    }
}
}

export function runSketchedAssay(selected_mol, assays) {
  console.log(assays)
  return (dispatch) => {
    dispatch(runSketchedAssaySucceeded(selected_mol, assays));
  }
}

export function runSketchedAssaySucceeded(selected_mol, assays) {
  return {
    type: 'RUN_SKETCHED_ASSAY_SUCCEEDED',
    payload: {
      molecule: selected_mol,
      assays_run: assays,
    },
}
} 

export function constructPlotObjSketcherSucceeded(plot_data) {
  return {
    type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
    payload: {
      plot_data: plot_data
    }
  }
}

export function constructPlotObjSketcher(saved_sketched_mols) {
  let plot_data = {};
  for (const [k, v] of Object.entries(saved_sketched_mols)) {
    let assay_obj = {};
    const assays_run = Object.keys(v.data.assays_run).reduce(
      (c, k) => ((c[k.toLowerCase().trim()] = v.data.assays_run[k]), c),
      {}
    );
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
    dispatch(constructPlotObjSketcherSucceeded(plot_data));
  };
}



