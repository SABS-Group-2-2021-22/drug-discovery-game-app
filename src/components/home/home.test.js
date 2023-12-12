import React from "react";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import Home from './home.js';
import rootReducer from '../../reducers'; // Import your root reducer
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';


// Import the real actions
import { initActions } from "../../actions";

// Mocks for other components
jest.mock("../analysis/the_plot.js", () => () => <div>Mocked PlotComponent</div>);
jest.mock('../results/spider_plot.js', () => () => <div>Mocked SpiderPlotComponent</div>);
jest.mock('../sketcher_analysis_redux/sketcher_the_plot.js', () => () => <div>Mocked SketcherThePlotComponent</div>);
jest.mock('../sketcher_results_redux/sketcher_spider_plot.js', () => () => <div>Mocked SpiderPlotComponent</div>);

// Mock the user service
jest.mock('../../services/user_service.js', () => ({
  login: jest.fn().mockResolvedValue({ user_status: 'Exists' })
}));

// Create a Redux store 
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// Define an initial state, use console logging in the game to determine what these should be 
const initialState = {
  login: {
    loggingIn: false,
    loggedIn: false,
    user: {}
  },
  selector: {
    selected_r_groups: { A: "A00", B: "B00", molecule: {}}
  }
};

// Test components 
test('renders welcome title and description text and checks fetchRGroup effect', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );

  // Check for the Welcome Title
  expect(screen.getByText("Welcome to the Drug Discovery Game")).toBeInTheDocument();

  // Check for MMP-12 Description Text
  expect(screen.getByText(/MMP-12 is an 18 kDa, monomeric enzyme/i)).toBeInTheDocument();

  // Check for Buttons Based on Logged In State
  if (initialState.login.loggedIn) {
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  } else {
    expect(screen.getByText("Start →")).toBeInTheDocument();
  }

  // Check for the Link URL
  expect(screen.getByRole('link')).toHaveAttribute('href', '/introduction');
});