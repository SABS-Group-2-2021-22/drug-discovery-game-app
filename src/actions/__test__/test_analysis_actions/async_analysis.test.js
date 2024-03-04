import * as api from '../../../api'; // Adjust the import path as necessary
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { analysisActions } from '../../analysis_actions';

// Set up the mock store with thunk middleware to handle asynchronous actions
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('analysisActions', () => {
    describe('constructPlotObj', () => {
      it('processes saved_mols and dispatches constructPlotObjSucceeded with correct plot data', async () => {
        // Ensure mock data matches the function's expectations
        const savedMolsMock = {
          mol1: {
            data: {
              assays_run: { assay1: true }, // Use lowercase to match key reduction logic
              drug_props: { assay1: 'value1' }, // Ensure keys match exactly after reduction
              descriptors: { Descriptor1: 'value1' }
            }
          }
        };
  
        // Adjust expected plot data to reflect actual logic
        const expectedPlotData = {
          mol1: {
            assay1: 'value1', // Key should match the reduced form from savedMolsMock
            Descriptor1: 'value1',
            "--": 0
          }
        };
  
        // Expected action structure should now match the revised expectation
        const expectedActions = [{
          type: 'CONSTRUCT_PLOT_OBJECT_SUCCEEDED',
          payload: { plot_data: expectedPlotData }
        }];
  
        // Create a mock store initialized with an empty state
        const store = mockStore({});
  
        // Dispatch the action
        await store.dispatch(analysisActions.constructPlotObj(savedMolsMock));
  
        // Verify the actions dispatched match expectations
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
  

