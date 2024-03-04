import { selectorActions } from '../../selector_actions.js'; 

describe('selectorActions - selectRGroupSucceeded', () => {
  it('should create an action to update the store with selected R group IDs and molecule data', () => {
    const r_group_id_A = 'R001';
    const r_group_id_B = 'R002';
    const molecule = { someKey: 'someValue' };
    const expectedAction = {
      type: 'SEL_R_FETCH_MOL_SUCCEEDED',
      payload: {
        r_group_id_A,
        r_group_id_B,
        molecule,
      },
    };

    expect(selectorActions.selectRGroupSucceeded(r_group_id_A, r_group_id_B, molecule)).toEqual(expectedAction);
  });
});

describe('selectorActions - Synchronous', () => {
  describe('fetchSpiderObjSucceeded', () => {
    it('should create an action to store Spider plot data', () => {
      const spider_data = { data: 'Some Spider Plot Data' };
      const expectedAction = {
        type: 'FETCH_SPIDER_SUCCEEDED',
        payload: {
          spider_data,
        },
      };

      expect(selectorActions.fetchSpiderObjSucceeded(spider_data)).toEqual(expectedAction);
    });
  });

  describe('fetchCompTextSucceeded', () => {
    it('should create an action to store comparison text data', () => {
      const comp_text = 'Comparison Text Data';
      const expectedAction = {
        type: 'FETCH_COMP_TEXT_SUCCEEDED',
        payload: {
          comp_text,
        },
      };

      expect(selectorActions.fetchCompTextSucceeded(comp_text)).toEqual(expectedAction);
    });
  });
});
