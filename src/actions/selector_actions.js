import * as api from "../api";

export const selectorActions = {
  selectRGroup,
  selectMolecule,
  fetchCompTextSucceeded,
  fetchSpiderObjSucceeded,
  selectRGroupSucceeded,
  selectMoleculeSucceeded,
};

/**
 * Synchronous action that sends the selected molecule and
 * its r groups to the store when dispatched
 * @param {txt} r_group_id_A id of the r group at position A
 * @param {txt} r_group_id_B id of the r group at position B
 * @param {object} molecule descriptor/metrics/assay data of the selected molecule
 * @returns {} r group ids and the molecule's data for a state change by the selectorReducer
 */
function selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule) {
  return {
    type: "SEL_R_FETCH_MOL_SUCCEEDED",
    payload: {
      r_group_id_A: r_group_id_A,
      r_group_id_B: r_group_id_B,
      molecule: molecule,
    },
  };
}

/**
 * Asynchronous action that fires an api call to fetch the selected r groups
 * and the created molecule from the BE
 * @param {txt} r_group_id_A id of the r group at position A
 * @param {txt} r_group_id_B id of the r group at position B
 * @param {txt} size the desired size of the image
 * @returns {dispatch} dispatches selectRGroupSuceeded for the selectorReducer (
 * passes in the r group ids and the molecule object)
 */

//function selectRGroup(r_group_id_A, r_group_id_B, size) {
  //console.log('CP1', r_group_id_A, r_group_id_B, size)
  //return (dispatch) => {
    //api.fetchMolecule(r_group_id_A, r_group_id_B, size).then((response) => {
      //let molecule = {};
      //molecule['data'] = response.data;
      //dispatch(selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule));
    //});
  //};
//}

function selectRGroup(r_group_id_A, r_group_id_B, size) {
  console.log('CP1', r_group_id_A, r_group_id_B, size);
  return (dispatch) => {
    return api.fetchMolecule(r_group_id_A, r_group_id_B, size).then((response) => {
      let molecule = { data: response.data };
      dispatch(selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule));
    }).catch(error => {
      console.error('An error occurred:', error);
      // Dispatching an action when an error occurs
      dispatch(selectRGroupFailed(error));
    });
  };
}

/**
 * Synchronous action creator for handling fetch molecule failure.
 * @param {Error} error The error that occurred.
 * @returns An action with the error information.
 */
function selectRGroupFailed(error) {
  return {
    type: 'SEL_R_FETCH_MOL_FAILED',
    error: error.toString(),
  };
}



/**
 * Asynchronous action that dispatches selectMoleculeSucceeded with
 * the id of the selected molecule
 * @param {state object} selected_mol text id object of selecte molecule
 * @returns {dispatch} dispatches selectMoleculeSucceeded with the
 * id of the selected molecule
 */

function selectMolecule(selected_mol) {
  return async (dispatch) => {
    const r_group_A = selected_mol.slice(0, 3);
    const r_group_B = selected_mol.slice(3, 6);
    api.postChosen(r_group_A, r_group_B);
    api.fetchSpiderObj().then((response) => {
      dispatch(fetchSpiderObjSucceeded(response));
    });
    api.fetchCompText().then((response) => {
      dispatch(fetchCompTextSucceeded(response));
    });
    api.fetchSpiderObj().then((response) => {
      dispatch(fetchSpiderObjSucceeded(response));
    });
    dispatch(selectMoleculeSucceeded(selected_mol));
  }
}

/**
 * Synchronous action that sends the selected mol id to the store when dispatched
 * @param {state object} selected_mol text id object of the selected molecule
 * @returns {} the selected_mol text id for a state change by the selectorReducer
 */
function selectMoleculeSucceeded(selected_mol) {
  return {
    type: "SELECT_MOLECULE_SUCCEEDED",
    payload: {
      selected_mol: selected_mol,
    },
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
 * Synchronous action that sends the chosen mol id to the store when dispatched
 * @param {state object} selected_mol text id object of the chosen molecule
 * @returns {} the selected_mol text id for a state change by the selectorReducer
 */




//function selectMolecule(selected_mol) {
  //return async (dispatch) => {
    //const r_group_A = selected_mol.slice(0, 3);
    //const r_group_B = selected_mol.slice(3, 6);

    //await api.postChosen(r_group_A, r_group_B);

    //const compTextResponse = await api.fetchCompText();
    //if (compTextResponse && compTextResponse.data) {
      //dispatch(fetchCompTextSucceeded(compTextResponse.data || {}));
    //}

    //dispatch(selectMoleculeSucceeded(selected_mol));
  //}
//}

//function selectMolecule(selected_mol) {
  //return async (dispatch) => {
    //const r_group_A = selected_mol.slice(0, 3);
    //const r_group_B = selected_mol.slice(3, 6);

    // Post the chosen R groups and wait for the operation to complete.
    //await api.postChosen(r_group_A, r_group_B);

    // Fetch the comparison text and dispatch the success action if the response is valid.
    //const compTextResponse = await api.fetchCompText();
    //if (compTextResponse && compTextResponse.data) {
      //dispatch(fetchCompTextSucceeded(compTextResponse.data));
    //}

    // After all operations and their respective dispatches are complete,
     //dispatch the action to indicate the successful selection of a molecule.
    //dispatch(selectMoleculeSucceeded(selected_mol));
  //}
//}

//function selectMolecule(selected_mol) {
  //return async (dispatch) => {
    //const r_group_A = selected_mol.slice(0, 3);
    //const r_group_B = selected_mol.slice(3, 6);

    //api.postChosen(r_group_A, r_group_B);
    
    //api.fetchCompText().then((response) => {
      //dispatch(fetchCompTextSucceeded(response));
    //});
    //dispatch(selectMoleculeSucceeded(selected_mol));
  //}
//}