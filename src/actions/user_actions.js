import { userConstants } from '../constants';
import { userService } from '../services';


export const userActions = {
    login,
    logout, 
    new_login, 
    loaded_login,
};

// defines login action with request to api via service 
function login(username) {
    return async dispatch => {
        dispatch(request(username.username));

        await userService.login(username)
            .then(response => {
                console.log(response)
                if (response.user_status === 'Exists') {
                    dispatch(pending(response));
                }
                else {
                    dispatch(success(response));
                    }
                }, 
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    // local helper functions
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function pending(user) { return { type: userConstants.LOGIN_PENDING, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function logout() {
    return dispatch => {
        dispatch(request());

        userService.logout()
        .then( () => {dispatch(success()); 
        }, 
        error => {
            dispatch(failure(error.toString()));
        } );
    
    }
    function request() { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE , error} }

}


function new_login(username) {
    console.log('new login');

    return async dispatch => {
        dispatch(request(username.username));

        await userService.login(username)
            .then(response => {
                console.log(response)
                    dispatch(success(response));
                }, 
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    // local helper functions
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}



function loaded_login(username) {
    console.log('loaded login');
    return async dispatch => {
        dispatch(request(username.username));

        await userService.login(username)
            .then(response => {
                console.log(response)
                    dispatch(success(response));
                }, 
                error => {
                    dispatch(failure(error.toString()));
                }
            );
        userService.loadgamestate(username)
                .then(game_data => {
                    console.log(game_data);
                    console.log(username);
                    // console.log( username.username);
                    console.log(game_data[username]);
                    let user_game_data = game_data[username]
                    console.log(Object.keys(user_game_data));
                    Object.keys(user_game_data).map( key => 
                        {
                            console.log(key);

                            if (key === 'time'){
                                console.log(user_game_data[key])
                                const time = user_game_data[key]
                                dispatch(updateTimeSucceeded(time))
                            }
                            else if (key === 'money'){
                                console.log(user_game_data[key])

                                const money = user_game_data[key]
                                dispatch(updateMoneySucceeded(money))
                            }
                            else if (key ==='molecule_info'){
                                let mol_data = user_game_data[key]
                                Object.keys(mol_data).map( mol_key => {
                                    
                                    const saved_mol = mol_data[mol_key]
                                    dispatch()
                                    Object.keys(saved_mol).map(property_key => {
                                        // if (property_key === 'lipinski'){
                                        //     dispatch(set_lipinski_values())
                                        // }
                                        if (property_key === 'descriptors'){
                                            console.log(mol_key)
                                            console.log(saved_mol[property_key])
                                            dispatch(fetchDescriptorsSucceeded(mol_key, saved_mol[property_key]))
                                        }
                                        // else if (property_key === 'assays_run'){
                                        //     dispatch(set_assays_run_values())
                                        // }

                                    })
                                   
                            })}
                        })})}}

    // local helper functions
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    //helper functions for loading game state
    function updateTimeSucceeded(time) {
        return {
          type: "UPDATE_TIME_SUCCEEDED",
          payload: {
            time: time,
          }
        }}

    function updateMoneySucceeded(money) {
        return {
            type: "UPDATE_MONEY_SUCCEEDED",
            payload: {
            money: money,
            }
        }}

    function fetchDescriptorsSucceeded(mol, descriptors) {
        return {
            type: "FETCH_DESCRIPTORS_SUCCEEDED",
            payload: {
            molecule: mol,
            descriptors: descriptors,
            },
        };
        }
        

    function fetchLipinskiSucceeded(mol, lipinski) {
        return {
            type: "FETCH_LIPINSKI_SUCCEEDED",
            payload: {
            molecule: mol,
            lipinski: lipinski,
            },
        };
        }