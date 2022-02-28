
const initialState = {
  all_r_groups: [],
  selected_r_groups: {'A': 'A01', 'B': 'B01', 'molecule':[]},
  saved_mols: [],
  saved_sketched_mols: []
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
        saved_mols: [...state.saved_mols, action.payload.saved_mol]
      }
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



