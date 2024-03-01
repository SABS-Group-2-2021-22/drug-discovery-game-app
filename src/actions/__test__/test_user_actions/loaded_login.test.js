import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { userActions } from '../../user_actions.js'; 
import { userConstants } from '../../../constants/user_constants.js'; 
import { userService } from '../../../services/user_service.js';
import * as api from '../../../api'; // 

// Setting up the mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loaded_login action creator tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();  // Clearing mocks to avoid test cross-contamination
  });

  it('dispatches the correct actions on successful game state load', async () => {
    const username = 'testUser';
    const mockLoginResponse = { user_status: 'Success', username };
    const mockGameData = {
      [username]: {
        time: 100,
        money: 500,
        molecule_info: {
          mol1: {
            keys: ['key1', 'key2'],
            assays_run: {},
            date_created: '2021-01-01'
          }
        }
      }
    };

    userService.login = jest.fn().mockResolvedValue(mockLoginResponse);
    userService.loadgamestate = jest.fn().mockResolvedValue(mockGameData);
    api.fetchMolecule = jest.fn();  // Mocking this but implementation detail would need to be fleshed out based on actual usage
    api.fetchDescriptors = jest.fn();  // As above
    api.fetchLipinski = jest.fn();  // As above

    const expectedActions = [
      { type: userConstants.LOGIN_REQUEST, user: username },
      { type: userConstants.LOGIN_SUCCESS, user: mockLoginResponse },
      // Add more expected actions related to the game state update here
    ];

    await store.dispatch(userActions.loaded_login({ username: 'testUser' }));

    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
  });
});

