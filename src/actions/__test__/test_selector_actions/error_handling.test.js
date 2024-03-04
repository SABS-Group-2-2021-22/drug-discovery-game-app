import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../api';
import { selectorActions } from '../../selector_actions.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../api', () => ({
  postChosen: jest.fn(),
  fetchSpiderObj: jest.fn(),
  fetchCompText: jest.fn(),
  fetchMolecule: jest.fn().mockImplementation(() => Promise.reject(new Error('Invalid input'))),
}));

describe('selectRGroup action creator error handling', () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('handles errors when fetching a molecule fails', async () => {
    const r_group_id_A = 'A01';
    const r_group_id_B = 'B01';
    const size = '500x500';
    const errorMessage = 'An error occurred';
    api.fetchMolecule.mockRejectedValueOnce(new Error(errorMessage));

    const expectedActions = [{
      type: 'SEL_R_FETCH_MOL_FAILED',
      error: `Error: ${errorMessage}`,
    }];

    const store = mockStore({});
    await store.dispatch(selectorActions.selectRGroup(r_group_id_A, r_group_id_B, size));

    expect(store.getActions()).toEqual(expectedActions);
    expect(errorSpy).toHaveBeenCalledWith('An error occurred:', expect.any(Error));
  });

  describe('selectRGroup action creator edge cases', () => {
    it('handles empty or invalid input gracefully', async () => {
      const r_group_id_A = '';
      const r_group_id_B = '';
      const size = '';

      // Explicitly setting up the mock to reject for these specific arguments
      api.fetchMolecule.mockImplementation(() => Promise.reject(new Error('Invalid input')));

      const errorMessage = 'Invalid input';
      const expectedActions = [{
        type: 'SEL_R_FETCH_MOL_FAILED',
        error: `Error: ${errorMessage}`,
      }];

      const store = mockStore({});
      await store.dispatch(selectorActions.selectRGroup(r_group_id_A, r_group_id_B, size));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('selectMolecule action creator', () => {
    it('dispatches the correct actions after selecting a molecule', async () => {
      const selectedMol = '123456';
      const mockSpiderResponse = { data: 'spider data' };
      const mockCompTextResponse = { data: 'comp text data' };
  
      // Mock each API response
      api.postChosen.mockResolvedValue(undefined);
      api.fetchSpiderObj.mockResolvedValue(mockSpiderResponse);
      api.fetchCompText.mockResolvedValue(mockCompTextResponse);
  
      // Define the expected actions, not assuming any order
      const expectedActions = expect.arrayContaining([
        { type: 'FETCH_SPIDER_SUCCEEDED', payload: { spider_data: mockSpiderResponse } },
        { type: 'FETCH_COMP_TEXT_SUCCEEDED', payload: { comp_text: mockCompTextResponse } },
        { type: 'SELECT_MOLECULE_SUCCEEDED', payload: { selected_mol: selectedMol } },
      ]);
  
      const store = mockStore({});
  
      await store.dispatch(selectorActions.selectMolecule(selectedMol));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
  