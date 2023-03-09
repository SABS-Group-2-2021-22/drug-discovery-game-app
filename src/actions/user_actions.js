import { userConstants } from '../constants';
import { userService } from '../services';


export const userActions = {
    login,
    logout
};

// defines login action with request to api via service 
function login(username) {
    return dispatch => {
        dispatch(request(username.username));

        userService.login(username)
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