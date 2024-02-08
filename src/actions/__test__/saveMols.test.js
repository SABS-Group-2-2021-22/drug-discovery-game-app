import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../api'; // Adjust the import path as necessary
import { assayActions } from '../assay_actions'; // Adjust the import path as necessary

// Setup mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the entire api module
jest.mock('../../api', () => ({
    postSaved: jest.fn(),
    fetchDescriptors: jest.fn(),
    fetchLipinski: jest.fn(),
}));

describe('saveMolecule Asynchronous Action', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        // Reset mocks before each test
        api.postSaved.mockClear();
        api.fetchDescriptors.mockClear();
        api.fetchLipinski.mockClear();
    });

    it('correctly dispatches actions after API calls succeed', async () => {
        // Mock API responses
        const mol_id = 'R1R2'; // Example mol_id based on A and B
        api.postSaved.mockResolvedValue({ success: true }); // Simplified mock response
        api.fetchDescriptors.mockResolvedValue({
            data: {
                descriptors: {
                    [mol_id]: { someKey: 'someDescriptorValue' } // Mock descriptor data
                }
            }
        });
        api.fetchLipinski.mockResolvedValue({
            data: {
                lipinski: {
                    [mol_id]: { anotherKey: 'someLipinskiValue' } // Mock Lipinski data
                }
            }
        });

        const savedMolsInitial = {}; // Initial state of saved molecules
        const selectedRGroups = {
            A: 'R1',
            B: 'R2',
            molecule: {
                data: {} // Initial data structure for the molecule
            }
        };
        const currentTime = 0; // Example current time

        // Expected actions based on the mock API responses
        const expectedActions = [
            {
                type: 'SAVE_MOLECULE_SUCCEEDED',
                payload: {
                    saved_mols: {
                        ...savedMolsInitial,
                        [mol_id]: {
                            data: {
                                toggle_assay: { pIC50: false, clearance_mouse: false, clearance_human: false, logd: false, pampa: false },
                                date_created: 30 - currentTime
                            }
                        }
                    }
                }
            },
            {
                type: 'FETCH_DESCRIPTORS_SUCCEEDED',
                payload: {
                    molecule: mol_id,
                    descriptors: { someKey: 'someDescriptorValue' }
                }
            },
            {
                type: 'FETCH_LIPINSKI_SUCCEEDED',
                payload: {
                    molecule: mol_id,
                    lipinski: { anotherKey: 'someLipinskiValue' }
                }
            }
        ];

        // Dispatch the action with the mocked arguments
        await store.dispatch(assayActions.saveMolecule(savedMolsInitial, selectedRGroups, currentTime));

        // Verify that the dispatched actions match the expected sequence
        expect(store.getActions()).toEqual(expectedActions);
    });
});
