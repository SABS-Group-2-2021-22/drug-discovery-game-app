import * as api from '../api';

export function retrieveAssayDataSucceeded(analysis) {
    return {
        type: "RETRIEVE_ASSAY_DATA_SUCCEEDED",
        payload: {
            data: analysis,
        }
    }
}

export function retrieveAssayData() {
  return dispatch => {
    api.retrieveAssayData()
    .then(response => response.json())
    .then(response => {
        dispatch(retrieveAssayDataSucceeded(response.assay_dict))
    })  
}}   
    
/*    axios.get("http://127.0.0.1:5000/getplotdata")
      .then((response) => response.json())
      .then(response => {
          dispatch(retrieveAssayDataSucceeded(response.assay_dict))
      })
      .catch((err => {
          dispatch({type: "RETRIEVE_FAILED", payload: err})
      }))
  }
} */ 
  
  
  
 /*   const url = "http://127.0.0.1:5000/getplotdata";
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return {
        type: "RETRIEVE_ASSAY_DATA",
        payload: {
          data: response.assay_dict,
        },
      };
    });
}
*/
