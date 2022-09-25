const initialState = {
  saved_sketched_mols: [],
  sketcher_error: [],
}; //the initial states for saved_sketched_mols and sketcher_error

/**
 * Controls state updates for the sketcher_error and chosen_mol states
 * @param {state object} state states for sketcher_error and chosen_mol
 * @param {action} action actions that update sketcher_error and chosen_mol
 * @returns {state} updated store for the sketcher_error and chosen_mol states
 */
export function sketcherReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_SKETCHED_MOLECULE_FAILED": {
      return {
        ...state,
        sketcher_error: [
          ...state.sketcher_error,
          action.payload.sketcher_error,
        ],
      };
    }
    case "POPUP_CLOSED_SUCCEEDED": {
      return {
        ...state,
        sketcher_error: [
          ...state.sketcher_error,
          action.payload.sketcher_error,
        ],
      };
    }
    // case 'RUN_SKETCHED_ASSAY_SUCCEEDED': {
    //     return {
    //         ...state,
    //         saved_sketched_mols: {
    //             ...state.saved_sketched_mols,
    //             [action.payload.molecule]: {
    //                 ...state.saved_sketched_mols[action.payload.molecule],
    //                 data: {
    //                     ...state.saved_sketched_mols[action.payload.molecule].data,
    //                     assays_run: action.payload.assays_run

    //                 },
    //             },
    //         },
    //     };
    // }
    case "CHOOSE_SKETCHED_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        chosen_mol: action.payload.chosen_mol,
      };
    }
    default: {
      return state;
    }
  }
}
