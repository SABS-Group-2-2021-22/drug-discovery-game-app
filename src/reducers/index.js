

export default function analysis(state = { analysis: [] }, action) {
    if (action.type === "RETRIEVE_ASSAY_DATA_SUCCEEDED") {
        return {
            analysis: action.payload.data,
        }
    }
    return state;
}



/* let latestParams = state.analysis[state.analysis.length - 1];
        // adds the latest action payload to analysis by mutating a copy of the latest object
        return { analysis: Object.assign({}, latestParams, action.payload) } */