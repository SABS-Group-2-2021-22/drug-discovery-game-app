
const initialState = {
  all_r_groups: [],
  selected_r_groups: {'A': 'A01', 'B': 'B01', 'molecule':[]},
  saved_mols: {},
  saved_sketched_mols: {}
  }

export default function r_groups(state = initialState, action) {
  switch (action.type) {
    case "FETCH_R_GROUP_SUCCEEDED": {
      return {
        ...state,
        all_r_groups: action.payload.r_groups,
      };
    }
    case "SEL_R_FETCH_MOL_SUCCEEDED": {
      return {
        ...state,
        selected_r_groups: {
          ...state.selected_r_groups,
          molecule: action.payload.molecule,
          A: action.payload.r_group_id_A,
          B: action.payload.r_group_id_B,
        },
      };
    }
    case "SAVE_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        saved_mols: action.payload.saved_mols,
      };
    }
    case "SELECT_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        selected_mol: action.payload.selected_mol,
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
              descriptors: action.payload.descriptors,
            },
          },
        },
      };
    }

    case "FETCH_FILTERS_SUCCEEDED": {
      return {
        ...state,
        saved_mols: {
          ...state.saved_mols,
          [action.payload.molecule]: {
            ...state.saved_mols[action.payload.molecule],
            data: {
              ...state.saved_mols[action.payload.molecule].data,
              filters: action.payload.filters,
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
              assays_run: action.payload.assays_run
              
              
              
              /* [
                ...state.saved_mols[action.payload.molecule].data.assays_run,
                action.payload.assays_run,
              ], */
            },
          },
        },
      };
    }
    case "SAVE_SKETCHED_MOLECULE_SUCCEEDED": {
      return {
        ...state, 
        saved_sketched_mols: [...state.saved_sketched_mols, action.payload.saved_mol]
      }
    }
    default: {
      return state;
    }
  }
}



