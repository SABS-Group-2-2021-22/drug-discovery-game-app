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
            comp_obj: {}
        };
        this.getChosenMolecule();
        // this.getStats();
        this.getComparisonTxt();
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
                this.setState({ chosen_mol_stats: { 'assays': response.assays[chosen_mol[0] + chosen_mol[1]] } })
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
                this.setState({ roche_mol_stats: { 'assays': response.assays[this.state.roche_mol[0] + this.state.roche_mol[1]] } })
                console.log(this.state.roche_mol_stats)
            })

    }

    getComparisonTxt () {
        const endpoint = 'http://127.0.0.1:5000/comparisontxt'
        fetch(endpoint)
            .then((response) => response.json())
            .then(response => {
                this.setState({ comp_obj: response.comparison})
            })
        
    }
    dispComparisonTxt() {
        let obj = this.state.comp_obj;
        var str = obj['pic50'] + '\n' + obj['logd'] + '\n' + obj['clearance_human'];
        return str;

    }

    render() {
        return (
            <div className="wrapper">
                <div className="results">
                    {/* Roche's molecule */}
                    <div className="real-molecule">
                        <div className="title">
                            Roche's molecule
                        </div>

                        <div className="molecule-image-and-descriptors">
                            <div className="molecule-image">
                                <figure>
                                    <div className="display_molecule_bar">
                                        {/* <div className="molecule-display"> */}
                                        <MoleculeImage key={this.state.roche_mol} r_groups={this.state.roche_mol} />
                                    </div>
                                    <figcaption>
                                        Below is the molecule that Roche chose.
                                    </figcaption> 
                  </figure>

                </div>

                <div class="container" className="molecule-descriptors">
                  {this.state.roche_mol_stats !== undefined ?
                    <Assays molecule_stats={this.state.roche_mol_stats} /> : ''}
                </div>





              </div>

            </div>


            {/* Chosen molecule */}
            <div className="chosen-molecule">
              <div className="title">
                Final molecule
              </div>

              <div className="molecule-image-and-descriptors">
                <div className="molecule-image">
                  <figure>
                    <div className="display_molecule_bar">
                      {this.state.chosen_mol !== undefined ?
                        <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
                        : ''}
                    </div>
                    {/* <figcaption>
                                        Below is the molecule that you chose.
                                    </figcaption> */}
                  </figure>

                </div>

                <div class="container" className="molecule-descriptors">
                  {this.state.chosen_mol_stats !== undefined ?
                    <Assays molecule_stats={this.state.chosen_mol_stats} /> : ''}
                </div>

              </div>

            </div>

          </div>
          {/* Spider plot */}
          <div className="spider-plot">
            {/* <div className="spider-plot-title">
                            Spider Plot
                        </div> */}
                        <SpiderPlot />
            </div>

            {/* Explanation of results */}
            
            <div className="explanation-results">
                        {this.dispComparisonTxt()}
            </div>
        </div >
        )
    }
}

export default Results;