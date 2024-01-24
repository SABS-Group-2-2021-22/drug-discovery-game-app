import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IntroTitle from '../introtitle.js';
import { unmountComponentAtNode } from 'react-dom';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting to prevent leaks error 
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

describe('IntroTitle Component', () => {
  it('renders "What are we designing the drug for?" when id is 1', () => {
    const { getByText } = render(<IntroTitle id={1} />);

    // Check if the correct text is in the document
    expect(getByText('What are we designing the drug for?')).toBeInTheDocument();
  });

  // Optionally, you can add more tests here for other id values
  it('renders "MMP-12 Inhibitor Target Compound Profile" when id is 2', () => {
    const { getByText } = render(<IntroTitle id={2} />);
    expect(getByText('MMP-12 Inhibitor Target Compound Profile')).toBeInTheDocument();
  });

  it('renders "The Drug Discovery Process" when id is 0', () => {
    const { getByText } = render(<IntroTitle id={0} />);
    expect(getByText('The Drug Discovery Process')).toBeInTheDocument();
  });

  it('renders "The Game Objective" when id is 3', () => {
    const { getByText } = render(<IntroTitle id={3} />);
    expect(getByText('The Game Objective')).toBeInTheDocument();
  });
});


