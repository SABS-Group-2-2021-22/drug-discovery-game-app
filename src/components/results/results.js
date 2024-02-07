import React from "react";
import "./results.css";
import { connect } from "react-redux";
import MoleculeImage from "./molecule_image.js";
import Assays from "./assay_display.js";
import SpiderPlot from "./spider_plot.js";
import ComparisonText from "./comparison_text.js";
import { gameActions } from "../../actions";
import { Link } from "react-router-dom";
import { userActions } from '../../actions';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMolecule: false
    };
    this.toggleMoleculeDisplay = this.toggleMoleculeDisplay.bind(this);
  }
  toggleMoleculeDisplay() {
    this.setState(prevState => ({
      showMolecule: !prevState.showMolecule
    }));
  }

  compile_game_data = () => {

    let molecule_info = {}
    Object.keys(this.props.saved_mols).map(mol_key => {
      console.log(this.props.saved_mols[mol_key])
      console.log(this.props.saved_mols[mol_key].data.descriptors)
      molecule_info[mol_key] = {
        "keys": [mol_key.slice(0, 3), mol_key.slice(3, 6)],
        "descriptors": this.props.saved_mols[mol_key].data.descriptors,
        "lipinski": this.props.saved_mols[mol_key].data.lipinski,
        "assays_run": this.props.saved_mols[mol_key].data.assays_run,
        "date_created": this.props.saved_mols[mol_key].date_created
      }
    })

    let game_data = {
      "money": this.props.money,
      "time": this.props.time,
      "chosen_mol": [this.props.selected_mol.slice(0, 3), this.props.selected_mol.slice(3, 6)],
      "molecule_info": molecule_info
    }
    return game_data
  }


  save_and_resetGame = () => {
    // let saved_user = JSON.parse(localStorage.getItem('user'));


    let game_data = JSON.stringify(this.compile_game_data())
    this.props.saveGame(game_data); // temporarily disabling any saving of user data
    this.props.resetGame();
    // this.props.login(saved_user);
  };

  render() {
    const { showMolecule } = this.state;
    return (
      <div className="wrapper">
       {(this.props.spider_data.data && this.props.comp_text.data) ? (
        <div className="results">
          <div className="molecule-choices">
            <div className="real-molecule">
              <div className="title">Molecule with desired profile</div>
              {!showMolecule&&(
              <button onClick = {this.toggleMoleculeDisplay} className="button-style">
                {showMolecule ? 'Hide Molecule' : 'Display best candidate compound'}
              </button>
              )}
              {showMolecule && (
                <div className="molecule-image-and-descriptors">
                  <div className="molecule-image">
                    <MoleculeImage mol_id={"Roche"} />
                  </div>
                  <div class="container" className="molecule-descriptors">
                    <Assays mol_id={"Roche"} />
                  </div>
                </div>
             )}
            </div>
            <div className="chosen-molecule">
              <div className="title">Your Molecule</div>
              <div className="molecule-image-and-descriptors">
                <div className="molecule-image">
                  <MoleculeImage mol_id={(this.props.gamemode === 'builder') ? this.props.selected_mol : this.props.selected_mol[0]} />
                </div>
                <div class="container" className="molecule-descriptors">
                  <Assays mol_id={(this.props.gamemode === 'builder') ? this.props.selected_mol : this.props.selected_mol[0]} />
                </div>
              </div>
            </div>
          </div>
          <div className="plot-and-explanation">
            <div className="spider-plot">
              <SpiderPlot mol_id={(this.props.gamemode === 'builder') ? this.props.selected_mol : this.props.selected_mol[0]} />
            </div>
            <div className="explanation-and-button">
              <div className="explanation">
                <ComparisonText />
              </div>
              <div className="control-panel">
                <Link to="/analysis">
                  <button> {'← Analysis'} </button>
                </Link>
                <Link to="/">
                  <button onClick={this.save_and_resetGame}> End Game </button>
                </Link>
              </div>
            </div>
          </div>
        </div> ) : (
          <div className='unsavedmol'>       
          <Link to="/Loadingpage">
            <button className="mk_pre_test_button">Go back to design your molecules first!</button>
          </Link></div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spider_data: state.analysis.spider_data,
    comp_text: state.analysis.comp_text,
    selected_mol: state.selector.selected_mol,
    gamemode: state.game.gamemode,
    saved_mols: state.assay.saved_mols,
    time: state.game.time,
    money: state.game.money,
  };
}

const actionCreators = {
  resetGame: gameActions.resetGame,
  saveGame: gameActions.saveGame,
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(Results);
