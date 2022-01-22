
export default function r_groups(state = { r_groups: []}, action){
    if (action.type === "FETCH_R_GROUP_SUCCEEDED") {
        return {
          r_groups: action.payload.r_groups
        };
    }
    return state;
}



