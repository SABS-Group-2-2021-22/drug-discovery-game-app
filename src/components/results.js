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

    render() {
        return (
            // <div className="wrapper">
                <div className="results">
  

                        <div className="real-molecule">
                        <div className='molecule-image-and-descriptors'>
                            <div className="title">
                                Roche's molecule
                            </div>
                            {/* <div className="molecule-display">
                                <MoleculeImage key={this.state.roche_mol} r_groups={this.state.roche_mol} />
                                {this.state.roche_mol_stats !== undefined ?
                                    <Assays molecule_stats={this.state.roche_mol_stats} /> : ''}
                            </div>
                        </div> */}

                        <div className="molecule-image">
                        <figure>
                            <div className="display_molecule_bar">
                                {/* <div className="molecule-display"> */}
                                {this.state.chosen_mol !== undefined ?
                                    <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
                                    : ''}
                            </div>
                            <figcaption>
                                Below is the molecule that Roche chose
                            </figcaption>
                        </figure>
                        </div>

                    </div>

                    <div class="container" className="molecule-descriptors">
                        {this.state.chosen_mol_stats !== undefined ?
                            <Assays molecule_stats={this.state.chosen_mol_stats} /> : ''}
                    </div>

                        {/* Chosen molecule */}
                        <div className="chosen_molecule">
                            <div className="title">
                                Final molecule
                            </div>
                            <div className="molecule-display">
                                
                                {this.state.chosen_mol !== undefined ?
                                    <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
                                    : ''}
                                {this.state.chosen_mol_stats !== undefined ?
                                    <Assays molecule_stats={this.state.chosen_mol_stats} /> : ''}             </div>
                        </div>
                    </div>
                    <div className='molecule-results-analysis'>
                        {/* Spider plot */}
                        <div className="spider_plot">
                            <SpiderPlot />
                        </div>
                        {/* Explanation of results */}
                        <div className="explanation_results">
                            Explanation of what went right/wrong
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default Results;


// render() {
//     return (
//         <div className="wrapper">
//             {/* Roche's molecule */}
//             <div className="real-molecule">
//                 <div className="title">
//                     Roche's molecule
//                 </div>

//                 <div className="molecule-image-and-descriptors">
//                     <div className="molecule-image">
//                         <figure>
//                             <div className="display_molecule_bar">
//                                 {/* <div className="molecule-display"> */}
//                                 {this.state.chosen_mol !== undefined ?
//                                     <MoleculeImage key={this.state.chosen_mol} r_groups={this.state.chosen_mol} />
//                                     : ''}
//                             </div>
//                             <figcaption>
//                                 Below is the molecule that Roche chose
//                             </figcaption>
//                         </figure>

//                     </div>

//                     <div class="container" className="molecule-descriptors">
//                         {this.state.chosen_mol_stats !== undefined ?
//                             <Assays molecule_stats={this.state.chosen_mol_stats} /> : ''}
//                     </div>





//                 </div>

//             </div>


//             {/* Chosen molecule */}
//             <div className="chosen-molecule">
//                 <div className="title">
//                     Final molecule
//                 </div>

//                 <div className="molecule-image-and-descriptors">
//                     <div className="molecule-image">
//                         <figure>
//                             <div className="display_molecule_bar">
//                                 <MoleculeImage key={this.state.final} r_groups={this.state.final} />
//                             </div>
//                             <figcaption>
//                                 Below is the molecule that you chose - need to change image
//                             </figcaption>
//                         </figure>

//                     </div>

//                     <div class="container" className="molecule-descriptors">
//                         <div className="row">Descriptors:</div>
//                         <div className="row">pIC50: number units</div>
//                         <div className="row">logD: number units</div>
//                         <div className="row">Mouse clearance: descriptor</div>
//                         <div className="row">Human clearane: descriptor</div>
//                         <div className="row">Permeability: descriptor</div>
//                     </div>

//                 </div>

//             </div>


//             {/* Spider plot */}
//             <div className="spider-plot">
//                 <div className="title">
//                     Spider Plot
//                 </div>
//                 <div className="spider-plot-image">
//                     <figure>
//                         {/* PUT SPIDER PLOT HERE WHERE IMAGE THING WAS/IS!!!! */}

//                         {/* <p> <img src={IMAGE_NAME}
//                     // width="400"
//                     // height="300"
//                     alt="molecule" /> </p> */}
//                         <figcaption>Below is a Spider Plot
//                         </figcaption>
//                     </figure>
//                 </div>


//             </div>

//             {/* Explanation of results */}
//             <div className="explanation-results">
//                 Explanation of what went right/wrong

//                 <div className="control-panel">
//                     <button onClick={this.endclick}>End</button>
//                     <button onClick={this.onButtonClickHandler}>Save</button>
//                 </div>

//             </div>
//         </div >
//     )
// }
// }

// export default Results;