import { userConstants } from "../constants";

// Check if user is already logged in
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user, username: {} } : {};

/**
 * Controls login store state changes for logginIn, loggedIn, and user
 * @param {state object} state the logginIn, loggedIn, and user states
 * @param {action} action actions that update loggingIn, loggedIn, and user states
 * @returns {state} updated logginIn, loggedIn, and user states
 */
export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: action.user,
      };
    default:
      return state;
  }
}
