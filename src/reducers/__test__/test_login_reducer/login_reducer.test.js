import { loginReducer } from '../../login_reducer.js'; 
import { userConstants } from '../../../constants/user_constants.js'; 


describe('loginReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      loggedIn: false,
      user: { username: '', user_status: '' },
    };
  });

  afterEach(() => {
    initialState = null;
  });

  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual({
      loggedIn: false,
      user: { username: '', user_status: '' },
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    const action = { type: userConstants.LOGIN_REQUEST, user: { username: 'testUser' } };
    const expectedState = {
      loggingIn: true,
      user: { username: 'testUser', user_status: '' },  // Corrected expectation
      loggedIn: false,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_PENDING', () => {
    const action = { type: userConstants.LOGIN_PENDING, user: { username: 'testUser', user_status: 'pending' } };
    const expectedState = {
      loggingIn: true,
      loggedIn: false,
      user: { username: 'testUser', user_status: 'pending' },
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = { type: userConstants.LOGIN_SUCCESS, user: { username: 'testUser', user_status: 'active' } };
    const expectedState = {
      loggedIn: true,
      user: { username: 'testUser', user_status: 'active' },
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILURE', () => {
    const action = { type: userConstants.LOGIN_FAILURE };
    expect(loginReducer(initialState, action)).toEqual({});
  });

  it('should handle LOGOUT_REQUEST', () => {
    const action = { type: userConstants.LOGOUT_REQUEST };
    const expectedState = {
      loggingOut: true,
      user: {},
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = { type: userConstants.LOGOUT_SUCCESS };
    const expectedState = {
      loggedIn: false,
      user: {},
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle LOGOUT_FAILURE', () => {
    const action = { type: userConstants.LOGOUT_FAILURE };
    expect(loginReducer(initialState, action)).toEqual({});
  });

  it('should return the current state for an unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    expect(loginReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST with undefined user', () => {
    const action = { type: userConstants.LOGIN_REQUEST };
    const expectedState = {
        loggingIn: true,
        user: { username: '', user_status: '' },
        loggedIn: false,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
});

});

// Initial State Test:

// Confirms the reducer returns the correct initial state when no state or action is provided.

// Action Type Tests:
// Each test checks if the reducer updates the state correctly based on different action types. 
// It addressed scenarios for LOGIN_REQUEST, LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, and an unknown action type.
// The tests validate both specific property changes and ensure that unrelated state properties remain unaffected.

// Undefined User Test:

//Includes a test for LOGIN_REQUEST with an undefined user, good for checking the reducer's robustness against incomplete action payloads.
