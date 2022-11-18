const initialState = {
  saved_mols: {},
  toggle_help: false,
  // toggle_assay: {pic50: false, clearance_mouse: false, clearance_human: false, logd:false, pampa:false}
};

/**
 * Controls state updates for saved_mols its embedded objects
 * @param {state object} state the saved_mols state
 * @param {action} action actions that update saved_mols
 * @returns {state} updated saved_mols state with the molecule and its data
 */
export function assayReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_MOLECULE_SUCCEEDED": {
      console.log(action.payload.saved_mols)
      return {
        ...state,
        saved_mols: action.payload.saved_mols, //store molecule in saved_mols
      };
    }
    case "SAVE_SKETCHED_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        saved_mols: action.payload.saved_mols, //store molecule in saved_mols
      };
    }
    case "FETCH_DESCRIPTORS_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              descriptors: action.payload.descriptors, //store descriptors in saved_mols.molecule.data.descriptors
            },
          },
        },
      };
    }
    case "FETCH_LIPINSKI_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              lipinski: action.payload.lipinski, //store lipinski in saved_mols.molecule.data.lipinski
            },
          },
        },
      };
    }
    case "RUN_ASSAY_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              assays_run: action.payload.assays_run, //store assays_run in saved_mols.molecule.data.assays_run
            },
          },
        },
      };
    }
    case "RUN_SKETCHED_ASSAY_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              assays_run: action.payload.assays_run, //store assays_run in saved_mols.molecule.data.assays_run
            },
          },
        },
      };
    }
    case "RESET": {
      return {
        ...state,
        saved_mols: action.payload.saved_mols,
      };
    }
    case "TOGGLE_HELP_SUCCEEDED": {
      return {
        ...state,
        toggle_help: action.payload.Bool,
      };
    }
    /* anissa changes */
    // case "TOGGLE_ASSAY_SUCCEEDED": {
    //   return {
    //     ...state,
    //       button: action.payload.button,
    //       bool: action.payload.bool,
    //   };
    // }

    case "TOGGLE_ASSAY_SUCCEEDED": {
      console.log(action.payload)
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            toggle_assay: {
              ...state.saved_mols[action.payload.molecule].toggle_assay,
              [action.payload.button]: action.payload.bool,
            },
          }
        },
      };
    }
    
    default: {
      return state;
    }
  }
}
