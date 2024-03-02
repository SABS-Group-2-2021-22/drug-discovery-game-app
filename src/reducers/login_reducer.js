import { userConstants } from "../constants";

// Check if user is already logged in
// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user:{username: user, user_status:''} } : {loggedIn: false, user: {username: '', user_status: ''}} ;
const initialState = { loggedIn: false, user:{username: '', user_status:''} }

export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            console.log(action.user);
            return {
                loggingIn: true,
                user: { username: action.user ? action.user.username : '', 
                user_status: '', 
                },  // Assuming action.user is an object
                loggedIn: false,
              };
        case userConstants.LOGIN_PENDING:
            console.log(action.user);
            return {
                loggingIn: true,
                loggedIn: false,
                user: action.user,
            };
        case userConstants.LOGIN_SUCCESS:
            console.log(action.user);
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT_REQUEST:
            return {
                loggingOut: true,
                user: {}
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                loggedIn: false,
                user: {}
            };
        case userConstants.LOGOUT_FAILURE:
            return {};
        default:
            return state
    }
}