// import React from 'react';
import { render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
import Home from './home.js';

test ('renders learn react link', async () => {
    render(<Header title="My header"/>);
    const headingElement = screen.getByText(/hometitle/i);
    expect(headingElement).toBeInTheDocument
});




