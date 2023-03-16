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
    };

    // local helper functions
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}