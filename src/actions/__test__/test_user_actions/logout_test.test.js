import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userService } from '../../../services/user_service.js';
import { userActions } from '../../user_actions.js'; 
import { userConstants } from '../../../constants/user_constants.js'; 

// Setting up the mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logout action creator tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks(); // Reset mocks to ensure clean slate for each test
  });

  it('dispatches success action when logout is successful', async () => {
    userService.logout = jest.fn().mockResolvedValue(); // Mocking a successful logout

    const expectedActions = [
      { type: userConstants.LOGOUT_REQUEST },
      { type: userConstants.LOGOUT_SUCCESS }
    ];

    await store.dispatch(userActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches failure action on logout error', async () => {
    const mockError = 'Logout failed';
    userService.logout = jest.fn().mockRejectedValue(new Error(mockError));

    const expectedActions = [
      { type: userConstants.LOGOUT_REQUEST },
      { type: userConstants.LOGOUT_FAILURE, error: mockError }
    ];

    await store.dispatch(userActions.logout());
    expect(store.getActions()).toEqual(expectedActions.map(action => 
      action.type === userConstants.LOGOUT_FAILURE ? 
      { ...action, error: expect.any(String) } : 
      action
    ));
  });
});


describe('new_login action creator', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks();
  });

  it('dispatches success action when new_login is successful', async () => {
    const mockUser = 'newUser';
    const mockResponse = { user_status: 'New User' }; // Simulate userService response for new user
    userService.login = jest.fn().mockResolvedValue(mockResponse);

    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: mockUser },
      { type: userConstants.LOGIN_SUCCESS, user: mockResponse }
    ];

    await store.dispatch(userActions.new_login({ username: mockUser }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches failure action on new_login error', async () => {
    const mockUser = 'newUser';
    const mockError = 'New login failed';
    userService.login = jest.fn().mockRejectedValue(new Error(mockError));

    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: mockUser },
      { type: userConstants.LOGIN_FAILURE, error: mockError }
    ];

    await store.dispatch(userActions.new_login({ username: mockUser }));
    expect(store.getActions()).toEqual(expectedActions.map(action => 
      action.type === userConstants.LOGIN_FAILURE ? 
      { ...action, error: expect.any(String) } : 
      action
    ));
  });
});
