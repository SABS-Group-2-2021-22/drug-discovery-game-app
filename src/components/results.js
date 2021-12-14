import React from 'react';
import "./results.css";
import styles from "./results.module.css";
// import ChosenMol from '../drug-discovery-game-app/src/A04.png'
import Roche_mol from '/home/sabsr3/Drugdiscoverygame2021-2/drug-discovery-game-app/src/target_mol.png'; // Tell webpack this JS file uses this image
//console.log(Roche_mol); // /Roche_mol.84287d09.png

class Results extends React.Component {

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
                            <p> <img src={Roche_mol}
                                // width="400"
                                // height="300"
                                alt="Roche_molecule" /> </p>
                            <figcaption>Below is the molecule that Roche chose
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
                                <p> <img src={Roche_mol} 
                                    // width="400"
                                    // height="300"
                                    alt="Roche_molecule" /> </p>
                                <figcaption>Below is the molecule that you chose - need to change image
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
                    
                    {/* More text */}
                
                </div>
                <div className="spider_plot_image">

                <figure>
                    <p> <img src={Roche_mol}
                        // width="400"
                        // height="300"
                        alt="Roche_molecule" /> </p>
                    <figcaption>Below is a Spider PLot
                    </figcaption>
                </figure>
                </div>


            </div>
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


class App extends React.Component{

    onButtonClickHandler = () => {
      window.alert('Hi')
    };
  
    render(){ 
      return(<div className="App">
        <button onClick={this.onButtonClickHandler}>Enter</button>
      </div>);
  
    }
  }  

class ControlPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current_r_groups: props.current_r_groups,
      };
    }
  
    saveMolecule = () => {
      const base_url = 'http://127.0.0.1:5000/save'
      fetch(base_url + '?r1=' + this.state.current_r_groups[0] 
                     + '&r2=' + this.state.current_r_groups[1], 
                     {method: 'POST'})
        }
  
    render() {
      const { text } = this.state;
      return (
        <div className="control-panel">
          <button>Clear</button>
          <button onClick={this.saveMolecule}>Save</button>
          <button>Assay</button>
        </div>
      );
    }
  }

export default Results;

// import logo from '/home/sabsr3/Drugdiscoverygame2021-2/drug-discovery-game-app/src/A04.png'; // Tell webpack this JS file uses this image

// console.log(logo); // /logo.84287d09.png

// function Header() {
//   // Import result is the URL of your image
//   return <img src={logo} alt="Logo" />;
// }

// export default Header;



{/* <figure>
<p> <img src="target_mol.png"
    width="136"
    height="200"
    alt="Eiffel tower" /> </p>
<figcaption>Scale model of the
    Eiffel tower in
    Parc Mini-France
</figcaption>
</figure>

figure {
float:right;
width: 30%;
text-align: center;
font-style: italic;
font-size: smaller;
text-indent: 0;
border: thin silver solid;
margin: 0.5em;
padding: 0.5em;} */}