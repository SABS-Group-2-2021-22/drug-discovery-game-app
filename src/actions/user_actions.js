import { userConstants } from '../constants';
import { userService } from '../services';
import * as api from '../api';


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
            .then(() => {
                dispatch(success());
            },
                error => {
                    dispatch(failure(error.toString()));
                });

    }
    function request() { return { type: userConstants.LOGOUT_REQUEST } }
    function success() { return { type: userConstants.LOGOUT_SUCCESS } }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }

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
        await userService.loadgamestate(username)
            .then(async game_data => {
                console.log(game_data);
                console.log(username);
                // console.log( username.username);
                console.log(game_data[username]);
                let user_game_data = game_data[username]
                console.log(Object.keys(user_game_data));
                await Promise.all(Object.keys(user_game_data).map(async key => {
                    console.log(key);

                    if (key === 'time') {
                        console.log(user_game_data[key])
                        const time = user_game_data[key]
                        dispatch(updateTimeSucceeded(time))
                    }
                    else if (key === 'money') {
                        console.log(user_game_data[key])

                        const money = user_game_data[key]
                        dispatch(updateMoneySucceeded(money))
                    }
                    else if (key === 'molecule_info') {
                        console.log('CP1')
                        let mol_data = user_game_data[key]
                        let saved_mols = {}
                        console.log('CP8', mol_data);
                        await Promise.all(Object.keys(mol_data).map(async mol_key => {
                            console.log(mol_key)
                            const saved_mol = mol_data[mol_key]
                            const r_group_id_A = mol_data[mol_key]["keys"][0]
                            const r_group_id_B = mol_data[mol_key]["keys"][1]


                            await api.fetchMolecule(r_group_id_A, r_group_id_B, '(500, 500)').then((response) => {
                                let molecule = {};
                                molecule['data'] = response.data;
                                console.log('CP7', molecule)
                                saved_mols[mol_key] = molecule
                                saved_mols[mol_key].data.toggle_assay = { pIC50: false, clearance_mouse: false, clearance_human: false, logd: false, pampa: false } // adds initial state for toggle_assay when you save the molecule
                                saved_mols[mol_key].data.date_created = -1
                                console.log('CP9', saved_mols)
                                dispatch(loadSavedMoleculesSucceeded(saved_mols))
                            }).then(async () => {
                                await api.fetchDescriptors(r_group_id_A, r_group_id_B) //fire api call to fetch the descriptors
                                    .then((response) => {
                                        let descriptors = response.data.descriptors[mol_key];
                                        dispatch(fetchDescriptorsSucceeded(mol_key, descriptors));
                                    }); // dispatch fetchDescriptorsSucceeded synchronous action with the descriptors
                                await api.fetchLipinski(r_group_id_A, r_group_id_B) //fire api call to fetch the filters
                                    .then((response) => {
                                        let lipinski = response.data.lipinski[mol_key];
                                        dispatch(fetchLipinskiSucceeded(mol_key, lipinski));
                                    });
                            });
                            // console.log(saved_mol)
                            // Object.keys(saved_mol).map(property_key => {
                            //     // if (property_key === 'lipinski'){
                            //     //     dispatch(set_lipinski_values())
                            //     // }
                            //     console.log(property_key)
                            //     if (property_key === 'descriptors') {
                            //         console.log(mol_key)
                            //         console.log(saved_mol[property_key])
                            //         dispatch(fetchDescriptorsSucceeded(mol_key, saved_mol[property_key]))
                            //     }
                            // else if (property_key === 'assays_run'){
                            //     dispatch(set_assays_run_values())
                            // }

                        }))
                        console.log(saved_mols)

                    }
                }))
                // }
            })
        // })
    }
}

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
    }
}

function updateMoneySucceeded(money) {
    return {
        type: "UPDATE_MONEY_SUCCEEDED",
        payload: {
            money: money,
        }
    }
}

function loadSavedMoleculesSucceeded(saved_mols) {
    return {
        type: "SAVE_MOLECULE_SUCCEEDED",
        payload: {
            saved_mols: saved_mols,
        },
    };
}

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