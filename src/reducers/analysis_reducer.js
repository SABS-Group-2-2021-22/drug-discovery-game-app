const initialState = {
  spider_data: {},
  comp_text: {},
};

export function analysisReducer(state = initialState, action) {
  switch (action.type) {
    case "CONSTRUCT_PLOT_OBJECT_SUCCEEDED": {
      return {
        ...state,
        plot_data: action.payload.plot_data,
      };
    }
    case "FETCH_SPIDER_SUCCEEDED": {
      return {
        ...state,
        spider_data: action.payload.spider_data,
      };
    }
    case "FETCH_COMP_TEXT_SUCCEEDED": {
      return {
        ...state,
        comp_text: action.payload.comp_text,
      };
    }
    default: {
        return state;
    }
  }
}
