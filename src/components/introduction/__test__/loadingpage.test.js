import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoadingPage from '../loadingpage.js';

// Define the initial state of the Redux store.
// The 'initialState' object mimics the intital state of the redux store
// And matches the shape and type of data the real redux store initilises with

const initialState = {
  init: {
    rgfetched: false,
    helpfetched: false,
    num: 0,
    all_r_groups: []
  }
};

// Create a function to configure the mock store
// This morck store does nt actually use any reducer logic
// It just provides a way to create a redux store with a specific state for testing purposes

const mockStore = configureStore([]);

// Group tests for the LoadingPage component
// The 'describe' fucntion groups togther the test of the 'LoadingPage' component.
// Test case for when loading is complete (num is 100)
// Create a mock store with the state where num is 100
// This simulates the Redux state when the loading process is complete.
// The LoadingPage component is rendered inside a Provider (to provide the Redux store) 
// and a Router (to provide routing context), as the component may depend on Redux and React Router.
// After rendering, assertions are made to check if the "Let's Start!" button is present and correctly linked to build section.
describe('LoadingPage Component Tests', () => {
  test('displays "Let\'s Start!" button when loading is complete (num is 100)', () => {

    const storeWithNum100 = mockStore({
      ...initialState,
      init: { ...initialState.init, num: 100 }
    });
    render(
      <Provider store={storeWithNum100}>
        <Router>
          <LoadingPage />
        </Router>
      </Provider>
    );

    const startButton = screen.getByRole('button', { name: /Let's Start!/i });
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('a')).toHaveAttribute('href', '/build');
  });


  // Test case for when loading is not complete 
  // This test checks the component's behavior when the num property is less than 100, indicating ongoing loading. 
  // A different mock store (storeWithNum50) is created with num set to a value less than 100 (e.g., 50). 
  // Assertions are made to ensure that a loading message and a progress bar are rendered. 
  // The progress bar should reflect the num value from the Redux state.

  test('displays loading message and progress bar when loading is not complete (num is less than 100)', () => {
    const testProgress = 50;
    const storeWithNum50 = mockStore({
      ...initialState,
      init: { ...initialState.init, num: testProgress }
    });
    render(
      <Provider store={storeWithNum50}>
        <LoadingPage />
      </Provider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', String(testProgress));
  });

});