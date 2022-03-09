const intitialState = {
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
