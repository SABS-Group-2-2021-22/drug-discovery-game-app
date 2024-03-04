import { selectorReducer } from '../../selector_reducer.js'; // Adjust the import path as necessary.

describe('selectorReducer', () => {
    let initialState;
  
    beforeEach(() => {
      initialState = {
        selected_or_not: false,
        selected_r_groups: { A: "A00", B: "B00", molecule: {} },
        selected_mol: "A00B00"
      };
    });
  
    afterEach(() => {
      initialState = null;
    });
  
    it('should return the initial state', () => {
      expect(selectorReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle SEL_R_FETCH_MOL_SUCCEEDED', () => {
      const action = {
        type: 'SEL_R_FETCH_MOL_SUCCEEDED',
        payload: { r_group_id_A: 'A01', r_group_id_B: 'B01', molecule: { id: 'mol1' } },
      };
      const expectedState = {
        ...initialState,
        selected_r_groups: { ...initialState.selected_r_groups, A: 'A01', B: 'B01', molecule: { id: 'mol1' } },
      };
      expect(selectorReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle SELECT_MOLECULE_SUCCEEDED', () => {
      const action = {
        type: 'SELECT_MOLECULE_SUCCEEDED',
        payload: { selected_mol: 'A02B02' },
      };
      const expectedState = { ...initialState, selected_mol: 'A02B02' };
      expect(selectorReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle CHOOSE_SKETCHED_MOLECULE_SUCCEEDED', () => {
      const action = {
        type: 'CHOOSE_SKETCHED_MOLECULE_SUCCEEDED',
        payload: { chosen_mol: 'customMol' },
      };
      const expectedState = { ...initialState, selected_or_not: true, chosen_mol: 'customMol' };
      expect(selectorReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should return the current state for an unknown action type', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      expect(selectorReducer(initialState, action)).toEqual(initialState);
    });
  });
  
