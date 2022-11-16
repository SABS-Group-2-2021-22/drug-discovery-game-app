const initialState = {
  all_r_groups: [],
  help: [],
  allfetched: false
};

export function initReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_R_GROUP_SUCCEEDED": {
      return {
        ...state,
        all_r_groups : action.payload.r_groups,
      };
    }
    case "FETCH_ROCHE_SUCCEEDED": {
      return {
        ...state,
        Roche: action.payload.Roche,
      };
    }
    case "FETCH_HELP_SUCCEEDED": {
      return {
        ...state,
        help: action.payload.help,
        allfetched : true
      };
    }
    default:
      return state;
  }
}
