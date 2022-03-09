
const initialState = {
  time: 30.0,
  money: 100000.0,
  all_r_groups: [],
  selected_r_groups: {'A': 'A01', 'B': 'B01', 'molecule':[]},
  saved_mols: {},
  spider_data: {},
  comp_text: {},
  }

export default function appReducer(state = initialState, action) {
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
            },
          },
        },
      };
    }
    case "UPDATE_TIME_SUCCEEDED": {
      return {
        ...state,
        time: action.payload.time
      };
    }
    case "UPDATE_MONEY_SUCCEEDED": {
      return {
        ...state,
        money: action.payload.money
      };
    }
    
    case "CHOOSE_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        chosen_mol: action.payload.chosen_mol
      }
    }
    case "CONSTRUCT_PLOT_OBJECT_SUCCEEDED": {
      return {
        ...state,
        plot_data: action.payload.plot_data
      }
    }
    case "FETCH_ROCHE_SUCCEEDED": {
      return {
        ...state,
          Roche: action.payload.Roche
      }
    }
    case "FETCH_SPIDER_SUCCEEDED": {
      return {
        ...state,
        spider_data: action.payload.spider_data
      }
    }
    case "FETCH_COMP_TEXT_SUCCEEDED": {
      return {
        ...state,
        comp_text: action.payload.comp_text
      }
    }
    case "RESET_GAME_SUCCEEDED": {
      return initialState
    }
    default: {
      return state;
    }
  }
}




