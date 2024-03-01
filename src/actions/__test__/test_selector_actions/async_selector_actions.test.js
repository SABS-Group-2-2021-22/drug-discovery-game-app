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
  fetchMolecule: jest.fn(),
}));

describe('selectRGroup action creator', () => {
  it('creates SELECT_R_FETCH_MOL_SUCCEEDED after successfully fetching molecule', () => {
    const r_group_id_A = 'A01';
    const r_group_id_B = 'B01';
    const size = '500x500';
    const expectedMoleculeData = { data: 'molecule data' };

    //Mock the specific API function to resolve with expected data
    api.fetchMolecule.mockResolvedValue({ data: expectedMoleculeData });

    const expectedActions = [
      { type: 'SEL_R_FETCH_MOL_SUCCEEDED', payload: { r_group_id_A, r_group_id_B, molecule: { data: expectedMoleculeData } } },
    ];

    const store = mockStore({});

    return store.dispatch(selectorActions.selectRGroup(r_group_id_A, r_group_id_B, size)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
