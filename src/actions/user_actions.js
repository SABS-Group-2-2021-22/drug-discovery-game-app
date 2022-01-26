import { userConstants } from '../constants';
import { userService } from '../services';

export const userActions = {
    login
};

// defines login action with request to api via service 
function login(username) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username)
            .then(
                user => {
                    dispatch(success(user));
                    // history.pushState('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    // local helper functions
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(user) { return { type: userConstants.LOGIN_FAILURE, user } }
}