import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IntroText from '../introtext.js';
import { Container } from 'react-bootstrap';

describe('IntroText Component', () => {
  it('contains correct links when id is 0', () => {
    const { getByText } = render(<IntroText id={0} />);

    // Check for the presence of specific links and their href attributes
    const lipinskisRuleLink = getByText('Lipinski\'s rule of five').closest('a');
    expect(lipinskisRuleLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Lipinski%27s_rule_of_five#cite_note-Lipinski_2001-1');

    const admetLink = getByText('ADMET').closest('a');
    expect(admetLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/ADME');

    const tpsaLink = getByText('TPSA').closest('a');
    expect(tpsaLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Polar_surface_area');

    const logPLink = getByText('LogP').closest('a');
    expect(logPLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Partition_coefficient#Partition_coefficient_and_log_P');
  });


});

describe('IntroText Component', () => {
    it('simulates click events on the links', () => {
      const { getByText } = render(<IntroText id={0} />);
  
      // Find each link
      const lipinskisRuleLink = getByText('Lipinski\'s rule of five').closest('a');
      const admetLink = getByText('ADMET').closest('a');
      const tpsaLink = getByText('TPSA').closest('a');
      const logPLink = getByText('LogP').closest('a');
      // Simulate click events
      fireEvent.click(lipinskisRuleLink);
      fireEvent.click(admetLink);
      fireEvent.click(tpsaLink);
      fireEvent.click(logPLink);
  
      // Assertions to check the effect of the click
      // (This depends on what happens when the link are clicked. 
      // If it's a navigation, I may need to mock the router context.)
    });
  });


   // Test when id/state is 1  
describe('IntroText Component', () => {
    it('has correct href attributes for links when id is 1', () => {
      const { getByText } = render(<IntroText id={1} />);
   // Find each link
   const mmp12Link = getByText('MMP-12').closest('a');
   expect(mmp12Link).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Matrix_metallopeptidase_12');
});
});

describe('IntroText Component', () => {
    it('has correct href attributes for links when id is 2', () => {
      const { getByText } = render(<IntroText id={2} />);
   // Find each link
   const logDLink = getByText('LogD').closest('a');
   expect(logDLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Partition_coefficient#:~:text=The%20distribution%20coefficient%2C%20log%20D%2C%20is%20the%20ratio,log%20P%20for%20non-ionizable%20compounds%20at%20any%20pH');
 
   const pampaLink = getByText('PAMPA').closest('a');
   expect(pampaLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Parallel_artificial_membrane_permeability_assay#:~:text=In%20medicinal%20chemistry%2C%20parallel%20artificial%20membrane%20permeability%20assay,-infused%20artificial%20membrane%20into%20an%20acceptor%20compartment.%20');

   const clearanceLink = getByText('clearance').closest('a');
   expect(clearanceLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Clearance_(pharmacology)');

   const pIC50Link = getByText('pIC').closest('a');
   expect(pIC50Link).toHaveAttribute('href', 'https://www.collaborativedrug.com/cdd-blog/what-is-pic50-2#:~:text=Simply%20stated%2C%20pIC50%20is%20the,is%20a%20pIC50%20of%209');

});
});

