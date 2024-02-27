import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../api'; // Adjust the import path as necessary
import { initActions } from '../../init_actions'; 


jest.mock('../../../api', () => ({
    fetchHelp: jest.fn(),
    fetchRGroup: jest.fn(), // Add this line
    fetchMolecule: jest.fn(), // Add this line
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
  
  it('accumulates R group data correctly and dispatches fetchRGroupSucceeded', async () => {
    const mockRGroupData = { A01: 'R Group Data for A01' };
    // Ensure api.fetchRGroup is correctly mocked above
    api.fetchRGroup.mockResolvedValueOnce(mockRGroupData);
  
    const expectedActions = [
      initActions.fetchRGroupSucceeded({ A01: mockRGroupData })
    ];
  
    await store.dispatch(initActions.fetchRGroup("A01", "someSize"));
  
    expect(api.fetchRGroup).toHaveBeenCalledWith("A01", "someSize");
    expect(store.getActions()).toEqual(expectedActions);
  });
  
  
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


  

  