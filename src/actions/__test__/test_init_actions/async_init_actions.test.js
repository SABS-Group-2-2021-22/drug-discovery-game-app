import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../api'; // Adjust the import path as necessary
import { initActions } from '../../init_actions'; 


jest.mock('../../../api', () => ({
    fetchHelp: jest.fn(),
    fetchRGroup: jest.fn().mockResolvedValue({/* Mocked response */}), 
    fetchMolecule: jest.fn().mockResolvedValue({/* Mocked response */}),
    // Add other API functions as needed
  }));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
  
describe('initActions - Asynchronous', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  it('dispatches fetchHelpSucceeded after successful fetchHelp API call', async () => {
    const mockHelpData = { data: { info_dict: 'Test Help Information' }};
    api.fetchHelp.mockResolvedValue(mockHelpData);

    const expectedActions = [
      initActions.fetchHelpSucceeded(mockHelpData)
    ];

    await store.dispatch(initActions.fetchHelp());

    expect(api.fetchHelp).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches fetchHelpSucceeded with the correct payload upon successful API call', async () => {
    const mockHelpData = { data: { info_dict: 'Test Help Information' } };
    api.fetchHelp.mockResolvedValue(mockHelpData);
  
    const expectedActions = [
      initActions.fetchHelpSucceeded(mockHelpData)
    ];
  
    await store.dispatch(initActions.fetchHelp());
  
    expect(api.fetchHelp).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
  
  //it('accumulates R group data correctly and dispatches fetchRGroupSucceeded', async () => {
    //// Setup specific mock responses for this test
    //api.fetchRGroup.mockImplementation((id, size) => 
     // Promise.resolve({ id, response: `Response for ${id} with size ${size}` })
   // );
  
    //// Expected action to be dispatched after all fetchRGroup calls
    //const expectedAction = {
     // type: 'FETCH_R_GROUP_SUCCEEDED',
      //payload: {
        //r_groups: {
         // A01: { id: 'A01', response: 'Response for A01 with size someSize' },
          // Include other IDs as expected based on the mock implementation
       // },
      //},
    //};
  
   // // Dispatch the action
   // await store.dispatch(initActions.fetchRGroup("someSize"));
  
    //// Assertions
   // expect(store.getActions()).toContainEqual(expectedAction);
  //});
  
  
  it('dispatches fetchRocheSucceeded with the correct molecule data after the API call', async () => {
    const mockMoleculeData = { molecule: 'Mock Molecule Data' };
    api.fetchMolecule.mockResolvedValue(mockMoleculeData);
  
    const expectedActions = [
      initActions.fetchRocheSucceeded(mockMoleculeData)
    ];
  
    await store.dispatch(initActions.fetchRoche());
  
    expect(api.fetchMolecule).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
  
  it('dispatches countRGroupNum with the expected count', async () => {
    const num = 10; // Example count
    const expectedActions = [
      initActions.countRGroupNum(num)
    ];
  
    await store.dispatch(initActions.countRGroup(num));
  
    expect(store.getActions()).toEqual(expectedActions);
  });

});


  

  