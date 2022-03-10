const initialState = {
  all_r_groups: [],
};

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
