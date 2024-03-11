import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import rootReducer from '../../../../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
jest.mock('react-plotly.js', () => () => <div>Plotly Chart</div>);
import Introduction from '../../introduction.js';

jest.mock('../../../../actions/index.js', () => ({
    initActions: {
        fetchRGroup: jest.fn().mockImplementation(() => ({ type: 'FETCH_RGROUP_MOCK' })),
    },
    selectorActions: {
        selectRGroup: jest.fn().mockImplementation(() => ({ type: 'SELECT_RGROUP_MOCK' })),
        selectMolecule: jest.fn().mockImplementation(() => ({ type: 'SELECT_MOLECULE_MOCK' })),
    },
    gameActions: {
        saveGame: jest.fn().mockImplementation(() => ({ type: 'SAVE_GAME_MOCK' })),
        resetGame: jest.fn().mockImplementation(() => ({ type: 'RESET_GAME_MOCK' })),
    },
    userActions: {
        logout: jest.fn().mockImplementation(() => ({ type: 'LOGOUT_MOCK' })),
    },
    assayActions: {
        saveMolecule: jest.fn().mockImplementation(() => ({ type: 'SAVE_MOLECULE_MOCK' })),
    },
    analysisActions: {
        constructPlotObj: jest.fn().mockImplementation(() => ({ type: 'CONSTRUCT_PLOT_OBJ_MOCK' })),
    },
}));

// Define your initial state based on the actual needs of the component
const initialState = {
    init: { num: 0 },
    selector: { selected_r_groups: { A: {}, B: {} } }
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Introduction Component', () => {
    let store; // Declare store variable

    beforeAll(() => {
        global.URL.createObjectURL = jest.fn(); // Place the mock directly inside the test suite
    });

    beforeEach(() => {
        store = mockStore(initialState); // Now store is defined
    });

    afterAll(() => {
        delete global.URL.createObjectURL; // Clean up the mock after tests complete
    });

    it('renders without crashing and shows the correct initial content', () => {
        const { getByText, queryByText } = render(
            <Provider store={store}>
                <Router>
                    <Introduction />
                </Router>
            </Provider>
        );

        // Verify that the initial view is correct
        expect(getByText('The Drug Discovery Process')).toBeInTheDocument();
        expect(getByText(/There are 4 stages in the drug discovery process/)).toBeInTheDocument();
        expect(queryByText('Back')).not.toBeInTheDocument();
        expect(getByText('Next')).toBeInTheDocument();
    });
});