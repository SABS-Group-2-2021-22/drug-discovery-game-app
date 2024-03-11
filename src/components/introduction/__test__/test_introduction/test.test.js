import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';
import rootReducer from '../../../../reducers';
import thunk from 'redux-thunk';
jest.mock('react-plotly.js', () => () => <div>Plotly Chart</div>);
import Introduction from '../../introduction.js';

// Mock necessary actions and any other modules if required
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

describe('Introduction Component Tests', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders without crashing and initializes correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <Introduction />
        </Router>
      </Provider>
    );

    // Check for initial content based on the default state
    expect(screen.getByText('The Drug Discovery Process')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    // Ensure the "Back" button is not displayed initially
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

});
