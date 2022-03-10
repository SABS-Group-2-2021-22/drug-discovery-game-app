import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import Home from '../components/home'
import store from '../store'

describe('Home', () => {
    test('renders Home component', () => {
        render(<Provider store={store}>
                <Home />
              </Provider>);
        expect(screen.getByText(/Welcome to the Drug Discovery Game/)).toBeInTheDocument();
    })
})