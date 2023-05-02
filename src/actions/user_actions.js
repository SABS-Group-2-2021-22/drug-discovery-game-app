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
    return async dispatch => {
        dispatch(request(username.username));

        await userService.login(username)
            .then(response => {
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
                dispatch(success(response));
            },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
        await userService.loadgamestate(username)
            .then(async game_data => {
                let user_game_data = game_data[username]
                await Promise.all(Object.keys(user_game_data).map(async key => {
                    if (key === 'time') {
                        const time = user_game_data[key]
                        dispatch(updateTimeSucceeded(time))
                    }
                    else if (key === 'money') {
                        const money = user_game_data[key]
                        dispatch(updateMoneySucceeded(money))
                    }
                    else if (key === 'molecule_info') {
                        let mol_data = user_game_data[key]
                        let saved_mols = {}
                        await Promise.all(Object.keys(mol_data).map(async mol_key => {
                            const r_group_id_A = mol_data[mol_key]["keys"][0]
                            const r_group_id_B = mol_data[mol_key]["keys"][1]

                            await api.fetchMolecule(r_group_id_A, r_group_id_B, '(500, 500)').then((response) => {
                                let molecule = {};
                                molecule['data'] = response.data;
                                saved_mols[mol_key] = molecule
                                saved_mols[mol_key].data.toggle_assay = { pIC50: false, clearance_mouse: false, clearance_human: false, logd: false, pampa: false } // adds initial state for toggle_assay when you save the molecule
                                saved_mols[mol_key].data.assays_run = mol_data[mol_key]["assays_run"]
                                saved_mols[mol_key].data.date_created = mol_data[mol_key]["date_created"]
                                dispatch(loadSavedMoleculesSucceeded(saved_mols))
                            }).then(async () => {
                                await api.fetchDescriptors(r_group_id_A, r_group_id_B) //fire api call to fetch the descriptors
                                    .then((response) => {
                                        let descriptors = response.data.descriptors[mol_key];
                                        dispatch(fetchDescriptorsSucceeded(mol_key, descriptors));
                                    });
                                await api.fetchLipinski(r_group_id_A, r_group_id_B) //fire api call to fetch the filters
                                    .then((response) => {
                                        let lipinski = response.data.lipinski[mol_key];
                                        dispatch(fetchLipinskiSucceeded(mol_key, lipinski));
                                    });
                            });
                        }))
                    }
                }))
            })
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