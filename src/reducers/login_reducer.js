import { userConstants } from "../constants";

// Check if user is already logged in
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, username: {} } : {} ;

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT_REQUEST:
            return {
                loggingOut: true,
                user: action.user
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                loggedIn: false,
                user: action.user
            };
        case userConstants.LOGOUT_FAILURE:
            return {};
        default:
            return state
    }
}