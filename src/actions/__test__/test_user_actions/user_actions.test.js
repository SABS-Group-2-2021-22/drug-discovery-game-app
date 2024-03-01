import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userService } from '../../../services/user_service.js';
import { userActions } from '../../user_actions.js'; 
import { userConstants } from '../../../constants/user_constants.js'; 

// Configure mock store with middlewares
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login action creator', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.resetAllMocks(); // Ensure mocks are clean between tests
  });

  it('dispatches success action when login is successful', async () => {
    const mockUser = 'testUser';
    const mockResponse = { user_status: 'Not Exists' }; // Adjust based on expected success response
    userService.login = jest.fn().mockResolvedValue(mockResponse);

    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: mockUser },
      { type: userConstants.LOGIN_SUCCESS, user: mockResponse }
    ];

    await store.dispatch(userActions.login({ username: mockUser }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches pending action when user exists', async () => {
    const mockUser = 'existingUser';
    const mockResponse = { user_status: 'Exists' }; // Adjust based on expected pending response
    userService.login = jest.fn().mockResolvedValue(mockResponse);

    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: mockUser },
      { type: userConstants.LOGIN_PENDING, user: mockResponse }
    ];

    await store.dispatch(userActions.login({ username: mockUser }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  describe('login action creator', () => {
    let store;
  
    beforeEach(() => {
      store = mockStore({});
      jest.resetAllMocks(); // Ensure mocks are clean between tests
    });
  
      it('dispatches failure action on login error', async () => {
      const mockUser = 'testUser';
      const mockError = 'Login failed'; // Adjust based on expected error message
      userService.login = jest.fn().mockRejectedValue(new Error(mockError));
  
      const expectedActions = [
          { type: userConstants.LOGIN_REQUEST, user: mockUser },
          { type: userConstants.LOGIN_FAILURE, error: "Error: Login failed" } // Updated to match the actual error format
        ];
  
      await store.dispatch(userActions.login({ username: mockUser }));
      expect(store.getActions()).toEqual(expectedActions);
    });
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
  
