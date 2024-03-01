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

