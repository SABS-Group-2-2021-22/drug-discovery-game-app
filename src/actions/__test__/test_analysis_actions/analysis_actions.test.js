// Import the necessary utilities and the specific actions for testing
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { analysisActions } from '../../analysis_actions';

// Creating a mock store with the middlewares you're using in your app
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('analysisActions', () => {
  // Since constructPlotObjSucceeded is synchronous, we technically don't need a mock store for it,
  // but we're including it here to demonstrate consistency with your setup for potential async action tests.
  let store;

  beforeEach(() => {
    // Create a new mock store for each test to ensure a clean state
    store = mockStore({});
  });

  describe('constructPlotObjSucceeded', () => {
    it('returns the correct action type and payload for plot data', () => {
      // Define the plot data to test with
      const plotData = { x: [1, 2, 3], y: [4, 5, 6] };

      // Expected action structure
      const expectedAction = {
        type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
        payload: {
          plot_data: plotData,
        },
      };

      // Dispatch the action directly since it's synchronous and doesn't need the store
      const action = analysisActions.constructPlotObjSucceeded(plotData);

      // Assert that the action created matches the expected action structure
      expect(action).toEqual(expectedAction);
    });
  });
});

