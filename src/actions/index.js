import * as api from '../api'

export function fetchRGroupSucceeded(r_group_obj) {
    return {
        type: "FETCH_R_GROUP_SUCCEEDED",
        payload: {
            r_groups: r_group_obj,
        }
    }
}

export function fetchRGroup() {
  const positions = ["A", "B"];
  var r_group_obj = {};
  for (const pos of positions) {
    for (let i = 1; i < 51; i++) {
      if (i < 10) {
        let id = String(pos + 0 + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      } else {
        let id = String(pos + i);
        api.fetchRGroup(id).then((response) => {
          r_group_obj[id] = response;
        });
      }
    }
  }
  console.log(r_group_obj);
  return (dispatch) => {
    dispatch(fetchRGroupSucceeded(r_group_obj));
  };
}



/*         return (dispatch) => {
          api.fetchRGroup(id).then((response) => {
            dispatch(fetchRGroupSucceeded(id, response));
          });
        }; */
        

/*       return (dispatch) => {
        api.fetchRGroup(id).then((response) => {
          dispatch(fetchRGroupSucceeded(id, response));
        });
      }; */

