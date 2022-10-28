const initialState = {
  selected_or_not : false,
  selected_r_groups: { A: "A01", B: "B01", molecule: [] }, //the inital r groups and an empty molecule
};

/**
 * Controls state updates for selected_r_groups, selected_mol, and chosen_mol
 * @param {state object} states the states for selected_r_groups, selected_mol, and chosen_mol
 * @param {action} action actions that update selected_r_groups, selected_mol, and chosen_mol
 * @returns {state} updates states for selected_r_groups, selected_mol, and chosen_mol
 */
export function selectorReducer(state = initialState, action) {
  switch (action.type) {
    case "SEL_R_FETCH_MOL_SUCCEEDED": {
      return {
        ...state,
        selected_or_not : false,
        selected_r_groups: {
          ...state.selected_r_groups,
          molecule: action.payload.molecule, //store molecule in selected_r_groups.molecule
          A: action.payload.r_group_id_A, //store r_group_id_A in selected_r_groups.A
          B: action.payload.r_group_id_B, //store r_group_id_B in selected_r_groups.B
        },
      };
    }
    case "SELECT_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        selected_or_not : false,
        selected_mol: action.payload.selected_mol,
      };
    }
    case "CHOOSE_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        selected_or_not : true,
        chosen_mol: action.payload.chosen_mol,
      };
    }
    case "CHOOSE_SKETCHED_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        selected_or_not : true,
        chosen_mol: action.payload.chosen_mol,
      };
    }
    default:
      return state;
  }
}
