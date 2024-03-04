const initialState = {
  saved_or_not: false,
  saved_mols: {},
  toggle_help: false,
  invoice_display: false,
  invoice: false,
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
      console.log('CP2', action.payload);

      // Check if action.payload.saved_mols exists; otherwise, keep the current state's saved_mols
      const updatedSavedMols = action.payload && action.payload.saved_mols !== undefined
        ? action.payload.saved_mols
        : state.saved_mols;

      return {
        ...state,
        saved_or_not: !!action.payload && action.payload.saved_mols !== undefined,
        saved_mols: updatedSavedMols,
      };
    }
    case "SAVE_SKETCHED_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        saved_or_not: true,
        saved_mols: action.payload.saved_mols, //store molecule in saved_mols
      };
    }
    case "FETCH_DESCRIPTORS_SUCCEEDED": {
      console.log(action.payload);
      // Check if the necessary properties exist in the payload.
      if (!action.payload || typeof action.payload.molecule !== 'string' || !action.payload.descriptors) {
        return state; // Return the current state if the payload is not valid.
      }
    
      // Ensure that the molecule exists in saved_mols; if not, just use an empty object to avoid errors.
      const existingMoleculeData = state.saved_mols[action.payload.molecule] || { data: {} };
    
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...existingMoleculeData,
            data: {
              ...existingMoleculeData.data,
              descriptors: action.payload.descriptors,
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
        saved_or_not: false,
        saved_mols: action.payload.saved_mols,
      };
    }
    case "TOGGLE_HELP_SUCCEEDED": {
      return {
        ...state,
        toggle_help: action.payload.Bool,
      };
    }
    case "INVOICE_DISPLAY_SUCCEEDED": {
      return {
        ...state,
        invoice_display: action.payload.Bool,
      };
    }
    case "SHOW_INVOICE_SUCCEEDED": {
      return {
        ...state,
        invoice: action.payload.invoice,
      };
    }

    case "TOGGLE_ASSAY_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              toggle_assay: {
                ...state.saved_mols[action.payload.molecule].data.toggle_assay,
                [action.payload.assay_type]: action.payload.is_selected, //store toggle_assay in saved_mols.molecule.data.toggle_assay
              },
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
