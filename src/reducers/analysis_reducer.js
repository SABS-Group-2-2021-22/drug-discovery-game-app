const initialState = {
  spider_data: {},
  comp_text: {},
};

/**
 * updates spider_data and comp_text states
 * @param {state_object} state the spider_data and comp_text states
 * @param {action} action actions that update plot_data, spider_data, and comp_text
 * @returns {state} updated state for plot_data, spider_data, and comp_text
 */
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
