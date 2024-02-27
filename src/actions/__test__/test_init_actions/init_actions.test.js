import { initActions } from '../../init_actions'; 

describe('initActions - Synchronous', () => {
    it('fetchHelpSucceeded creates the correct action', () => {
      const helpData = { info_dict: 'Test Help Information' };
      const expectedAction = {
        type: 'FETCH_HELP_SUCCEEDED',
        payload: {
          help: helpData.info_dict,
        },
      };
      expect(initActions.fetchHelpSucceeded({ data: helpData })).toEqual(expectedAction);
    });
  });

  it('fetchRGroupSucceeded creates the correct action', () => {
    const rGroupData = { A01: 'R Group Data' };
    const expectedAction = {
      type: 'FETCH_R_GROUP_SUCCEEDED',
      payload: {
        r_groups: rGroupData,
      },
    };
    expect(initActions.fetchRGroupSucceeded(rGroupData)).toEqual(expectedAction);
  });

  it('fetchRocheSucceeded creates the correct action', () => {
    const rocheData = { molecule: 'Roche Molecule Data' };
    const expectedAction = {
      type: 'FETCH_ROCHE_SUCCEEDED',
      payload: {
        Roche: rocheData,
      },
    };
    expect(initActions.fetchRocheSucceeded(rocheData)).toEqual(expectedAction);
  });

  it('countRGroupNum creates the correct action', () => {
    const num = 10;
    const expectedAction = {
      type: 'COUNTR_START',
      payload: {
        num: num,
      },
    };
    expect(initActions.countRGroupNum(num)).toEqual(expectedAction);
  });
  
  
  