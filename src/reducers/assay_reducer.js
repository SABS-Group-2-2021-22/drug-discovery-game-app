const initialState = {
  saved_mols: {},
};

export function assayReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_MOLECULE_SUCCEEDED": {
      return {
        ...state,
        saved_mols: action.payload.saved_mols,
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
              assays_run: action.payload.assays_run,
            },
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
