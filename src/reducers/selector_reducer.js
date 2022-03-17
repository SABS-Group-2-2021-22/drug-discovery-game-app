const initialState = {
  selected_r_groups: { A: "A01", B: "B01", molecule: [] },
};

export function selectorReducer(state = initialState, action) {
    switch (action.type) {
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
      case "SELECT_MOLECULE_SUCCEEDED": {
        return {
          ...state,
          selected_mol: action.payload.selected_mol,
        };
      }
      case "CHOOSE_MOLECULE_SUCCEEDED": {
        return {
          ...state,
          chosen_mol: action.payload.chosen_mol,
        };
      }
      case "CHOOSE_SKETCHED_MOLECULE_SUCCEEDED": {
        return {
            ...state,
            chosen_mol: action.payload.chosen_mol
        }
    }
      default:
          return state
    }
}