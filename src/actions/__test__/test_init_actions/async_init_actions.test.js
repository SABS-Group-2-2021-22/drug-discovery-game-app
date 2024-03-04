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


  

// Testing fetchHelp action: 
//Success Case Test: This test verifies that when the `fetchHelp` API call is successful, the `fetchHelpSucceeded` action is dispatched with the expected data. 
// The process involves mocking the `fetchHelp` API to resolve with predefined data (`mockHelpData`), simulating a successful API response. 
// After dispatching the `fetchHelp` action, the test asserts that the `fetchHelp` API was called and that the store's dispatched actions match the `expectedActions`, which should only include `fetchHelpSucceeded` with the mock data. 

// Payload Verification Test:
// This test is like the previous one but focuses on verifying that the payload within the dispatched `fetchHelpSucceeded` action is correct. 
// It ensures that the structure and content of the payload (mockHelpData) are exactly as expected, confirming that the action creator correctly handles the API response. 


// Testing fetchRoche action: 
// Molecule Data Test: This test checks whether the `fetchRocheSucceeded` action is dispatched with the appropriate payload after the `fetchMolecule` API call succeeds.
// The `fetchMolecule` API is mocked to return `mockMoleculeData`, and the test verifies that this data is used in the payload of the `fetchRocheSucceeded` action. 
// The main goal is to ensure that the application state is updated correctly based on the API response, reflecting the new molecule data in the Redux store. 

// Testing countRGroupNum action:
// Count Verification Test: While not directly related to an API call, this test checks the behaviour of dispatching the `countRGroupNum` action with a specific numeric count. 
//  The test confirms that the action is dispatched with the expected count value (`num`), aiming to verify that the correct data is relayed to reducers or other parts of the application.
//  This could be important for tracking state that depends on counts or numbers, such as tallies or totals that are central to application logic. 

// Each of these tests aims to ensure that the respective asynchronous actions are dispatched correctly in response to their triggers (like successful API calls) and that they carry the correct data, ensuring the application state remains predictable and manageable.
