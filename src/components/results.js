import React from 'react';
import "./results.css";
import styles from "./results.module.css";
import { MoleculeImage } from './app';

class Results extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            final: ['A01', 'B01'],
            Roche_mol: ['A05', 'B07'],
        };
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
        <div className ="results">

            {/* Roche's molecule */  }
            <div className = "real_molecule">
                <div className="real_molecule_title">
                    <span className={styles.red_bold}>
                        Roche's molecule
                    </span> 
  
                </div>
                
                <div className="real_molecule_image_and_descriptors">
                    <div className="real_molecule_image">
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

                    <div className="real_molecule_descriptors">
                    Descriptors:
                    {"\n"}pIC50: number units
                    {"\n"}logD: number units
                    {"\n"}Mouse clearance: descriptor
                    {"\n"}Human clearane: descriptor
                    {"\n"}Permeability: descriptor
                    </div>

                </div>

            </div>


             {/* Chosen molecule */  }
            <div className = "chosen_molecule">
                 <div className="chosen_molecule_title">
                    <span className={styles.red_bold}>
                        Final molecule
                        </span> 
                </div>

                <div className="chosen_molecule_image_and_descriptors">
                        <div className="chosen_molecule_image">
                            <figure>
                                <div className="display_molecule_bar">
                                    <MoleculeImage key={this.state.final} r_groups={this.state.final} />
                                 </div>
                                <figcaption>
                                    Below is the molecule that you chose - need to change image
                                </figcaption>
                            </figure>

                    </div>

                    <div className="chosen_molecule_descriptors">
                    Descriptors:
                    {"\n"}pIC50: number units
                    {"\n"}logD: number units
                    {"\n"}Mouse clearance: descriptor
                    {"\n"}Human clearane: descriptor
                    {"\n"}Permeability: descriptor
                    </div>

                </div>

            </div>
            

             {/* Spider plot */  }
            <div className = "spider_plot">
            <div className="spider_plot_title">
                    <span className={styles.red_bold}>
                        Spider Plot
                        </span> 
                </div>
                <div className="spider_plot_image">
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

            {/* Explanation of results */  }
            <div className = "explanation_results">
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