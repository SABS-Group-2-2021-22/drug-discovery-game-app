import React from 'react';
import "./results.css";
import SpiderPlot from "./SpiderPlot.js";

import { MoleculeImage } from './app'

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen_mol: undefined,
      roche_mol: ['A05', 'B07']
    };
    this.getChosenMolecule();
  }
  getChosenMolecule = () => {
    const base_url = 'http://127.0.0.1:5000/chosenmolecule'
    fetch(base_url)
      .then((response) => response.json())
      .then(response => {
        this.setState({ chosen_mol: response.chosen_mol })
      })
  }
  render() {
    return (
      <div className="wrapper">
        <div className="results">
          <div className='molecule-images'>
            <div className="real_molecule">Roche's Molecule
              <MoleculeImage key={this.state.roche_mol} r_groups={this.state.roche_mol} />

            </div>
            <div className="chosen_molecule">Final Molecule
              {this.state.chosen_mol !== undefined ?
                <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
                : 'img'}
            </div>
          </div>
          <div className='molecule-results-analysis'>
            <div className="spider_plot">
              <SpiderPlot />
            </div>
            <div className="explanation_results">
              Explanation of what went right/wrong
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;