import React from 'react';
import "./results.css";
import { MoleculeImage } from './app';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            final: ['A01', 'B01'],
            Roche_mol: ['A05', 'B07'],
        };
    };

    fetchChosenMolecule() {
        const base_url = 'http://127.0.0.1:5000/chosenmolecule'
        fetch(base_url)
            .then((response) => response.json())
            .then(chosen_mol => {
                this.setState({ final: 'A0' + chosen_mol.chosen_mol }) /* Remove 'A0' when have changed analysis page st */
                console.log(chosen_mol)
                console.log(this.state.final)
            })
            .catch(err => {
                throw Error(err.message);
            });
    };

    onButtonClickHandler = () => {
        window.alert('Saved')
    };

    endclick = () => {
        window.alert('Thank you for playing')
    };

    render() {
        console.log('Renderer started')
        return (
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
                                    <MoleculeImage
                                        key={this.state.Roche_mol}
                                        r_groups={this.state.Roche_mol}
                                        alt="Roche_molecule" />    {/* Alt text not working */}
                                </div>
                                <figcaption>
                                    Below is the molecule that Roche chose
                                </figcaption>
                            </figure>

                        </div>

                        <div class="container" className="molecule-descriptors">
                            <div className="row">Descriptors:</div>
                            <div className="row">pIC50: number units </div>
                            <div className="row">logD: number units</div>
                            <div className="row">Mouse clearance: descriptor</div>
                            <div className="row">Human clearane: descriptor</div>
                            <div className="row">Permeability: descriptor</div>
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
                                    <MoleculeImage key={this.state.final} r_groups={this.state.final} />
                                </div>
                                <figcaption>
                                    Below is the molecule that you chose - need to change image
                                </figcaption>
                            </figure>

                        </div>

                        <div class="container" className="molecule-descriptors">
                            <div className="row">Descriptors:</div>
                            <div className="row">pIC50: number units</div>
                            <div className="row">logD: number units</div>
                            <div className="row">Mouse clearance: descriptor</div>
                            <div className="row">Human clearane: descriptor</div>
                            <div className="row">Permeability: descriptor</div>
                        </div>

                    </div>

                </div>


                {/* Spider plot */}
                <div className="spider-plot">
                    <div className="title">
                        Spider Plot
                    </div>
                    <div className="spider-plot-image">
                        <figure>
                            {/* PUT SPIDER PLOT HERE WHERE IMAGE THING WAS/IS!!!! */}

                            {/* <p> <img src={IMAGE_NAME}
                        // width="400"
                        // height="300"
                        alt="molecule" /> </p> */}
                            <figcaption>Below is a Spider Plot
                            </figcaption>
                        </figure>
                    </div>


                </div>

                {/* Explanation of results */}
                <div className="explanation-results">
                    Explanation of what went right/wrong

                    <div className="control-panel">
                        <button onClick={this.endclick}>End</button>
                        <button onClick={this.onButtonClickHandler}>Save</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Results;