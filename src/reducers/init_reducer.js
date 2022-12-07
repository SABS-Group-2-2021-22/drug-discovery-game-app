const initialState = {
  all_r_groups: {},
  help: [],
  rgfetched: false,
  rochefetched: false,
  helpfetched: false,
  num: -1,
};

export function initReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_R_GROUP_SUCCEEDED": {
      return {
        ...state,
        all_r_groups : action.payload.r_groups,
        rgfetched: true,
      };
    }
    case "FETCH_ROCHE_SUCCEEDED": {
      return {
        ...state,
        Roche: action.payload.Roche,
        rochefetched: true,
      };
    }
    case "FETCH_HELP_SUCCEEDED": {
      return {
        ...state,
        help: action.payload.help,
        helpfetched: true
      };
    }
    case "COUNTR_START": {
      return {
        ...state,
        num: action.payload.num
      };
    }

    default:
      return state;
  }
}
