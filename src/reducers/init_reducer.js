const initialState = {
  all_r_groups: [],
};

/**
 * Updates the store with r groups and Roche's molecule after an initial api dispatch
 * @param {state object} state the intial empty r group state
 * @param {action} action
 * @returns {state} update all_r_group state and Roche molecule state
 */
export function initReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_R_GROUP_SUCCEEDED": {
      return {
        ...state,
        all_r_groups: action.payload.r_groups,
      };
    }
    case "FETCH_ROCHE_SUCCEEDED": {
      return {
        ...state,
        Roche: action.payload.Roche,
      };
    }
    default:
      return state;
  }
}
