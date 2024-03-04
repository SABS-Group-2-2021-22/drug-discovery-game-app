import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { analysisActions } from '../../analysis_actions';

// Set up the mock store with thunk middleware to handle asynchronous actions
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('analysisActions', () => {
  let store;

  beforeEach(() => {
    // Create a new mock store for each test to ensure a clean state
    store = mockStore({});
  });

  describe('constructPlotObjSucceeded', () => {
    it('returns the correct action type and payload for plot data', () => {
      const plotData = { x: [1, 2, 3], y: [4, 5, 6] };
      const expectedAction = {
        type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
        payload: { plot_data: plotData },
      };

      const action = analysisActions.constructPlotObjSucceeded(plotData);
      expect(action).toEqual(expectedAction);
    });
  });

  describe('constructPlotObj', () => {
    it('processes saved_mols and dispatches constructPlotObjSucceeded with correct plot data', async () => {
      const savedMolsMock = {
        mol1: {
          data: {
            assays_run: { assay1: true },
            drug_props: { assay1: 'value1' },
            descriptors: { Descriptor1: 'value1' },
          },
        },
      };

      const expectedPlotData = {
        mol1: {
          assay1: 'value1',
          Descriptor1: 'value1',
          "--": 0,
        },
      };

      const expectedActions = [{
        type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
        payload: { plot_data: expectedPlotData },
      }];

      await store.dispatch(analysisActions.constructPlotObj(savedMolsMock));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles empty saved_mols object correctly', async () => {
      const expectedActions = [{
        type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
        payload: { plot_data: {} },
      }];

      await store.dispatch(analysisActions.constructPlotObj({}));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('handles saved_mols with missing properties correctly', async () => {
      const incompleteSavedMols = {
        mol1: { data: {} }, // Adjusted to reflect truly missing properties
      };

      const expectedPlotData = {
        mol1: { "--": 0 }, // Expected minimal plot data structure
      };

      const expectedActions = [{
        type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
        payload: { plot_data: expectedPlotData },
      }];

      await store.dispatch(analysisActions.constructPlotObj(incompleteSavedMols));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
