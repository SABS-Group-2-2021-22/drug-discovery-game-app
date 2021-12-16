import React from 'react';
import "./results.css";

import SpiderPlot from "./SpiderPlot.js";

import { MoleculeImage } from './app'
import { Assays } from './assay'

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen_mol: undefined,
      roche_mol: ['A05', 'B07'],
      roche_mol_stats: undefined,
      chosen_mol_stats: undefined,
    };
    this.getChosenMolecule();
    // this.getStats();
  }
  getChosenMolecule = () => {
    const base_url = 'http://127.0.0.1:5000/chosenmolecule'
    fetch(base_url)
      .then((response) => response.json())
      .then(response => {
        this.setState({ chosen_mol: response.chosen_mol })
        this.getStats(response.chosen_mol)
      })
    // .then(response => {
    //   this.getStats(response.chosen_mol)
    // })
  }

  getStats = (chosen_mol) => {
    var url = 'http://127.0.0.1:5000/assays?' +
      'r1=' + chosen_mol[0] +
      '&r2=' + chosen_mol[1] +
      '&pic50=' + 'Yes' +
      '&clearance_mouse=' + 'Yes' +
      '&clearance_human=' + 'Yes' +
      '&logd=' + 'Yes' +
      '&pampa=' + 'Yes'
    fetch(url)
      .then((response) => response.json())
      .then(response => {
        this.setState({ chosen_mol_stats: response })
      })

    url = 'http://127.0.0.1:5000/assays?' +
      'r1=' + this.state.roche_mol[0] +
      '&r2=' + this.state.roche_mol[1] +
      '&pic50=' + 'Yes' +
      '&clearance_mouse=' + 'Yes' +
      '&clearance_human=' + 'Yes' +
      '&logd=' + 'Yes' +
      '&pampa=' + 'Yes'
    fetch(url)
      .then((response) => response.json())
      .then(response => {
        this.setState({ roche_mol_stats: response })
        console.log(this.state.roche_mol_stats)
      })

  }

  render() {
    return (
      <div className="wrapper">
        <div className="results">
          <div className='molecule-images'>
            {/* Roche's molecule */}
            <div className="real-molecule">
              <div className="title">
                Roche's molecule
              </div>
              <div className="molecule-display">
                <MoleculeImage key={this.state.roche_mol} r_groups={this.state.roche_mol} />
                {this.state.roche_mol_stats !== undefined ?
                  <Assays molecule_stats={this.state.roche_mol_stats} /> : ''}
              </div>
            </div>
            <div className="chosen_molecule">
              <div className="title">
                Final molecule
              </div>
              {this.state.chosen_mol !== undefined ?
                <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
                : ''}
              {this.state.chosen_mol_stats !== undefined ?
                <Assays molecule_stats={this.state.chosen_mol_stats} /> : ''}             </div>
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