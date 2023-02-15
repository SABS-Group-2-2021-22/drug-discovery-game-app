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
  }

  save_and_resetGame = () => {
    let saved_user = JSON.parse(localStorage.getItem('user'));
    this.props.saveGame();
    this.props.resetGame();
    this.props.login(saved_user);
    window.location.href="/";
  };

  render() {
    if (!this.props.spider_data.data || !this.props.comp_text.data) {
      return <div />;
    }
    return (
      <div className="wrapper">
        <div className="results">
          <div className="molecule-choices">
            <div className="real-molecule">
              <div className="title">Molecule with desired profile</div>
              <div className="molecule-image-and-descriptors">
                <div className="molecule-image">
                  
                    
                      <MoleculeImage mol_id={"Roche"} />
                    
                  
                </div>
                <div class="container" className="molecule-descriptors">
                  <Assays mol_id={"Roche"} />
                </div>
              </div>
            </div>
            <div className="chosen-molecule">
              <div className="title">Your Molecule</div>
              <div className="molecule-image-and-descriptors">
                <div className="molecule-image">
                      <MoleculeImage mol_id={(this.props.gamemode === 'builder') ? this.props.chosen_mol: this.props.chosen_mol[0]} />
                </div>
                <div class="container" className="molecule-descriptors">
                  <Assays mol_id={(this.props.gamemode === 'builder') ? this.props.chosen_mol: this.props.chosen_mol[0]} />
                </div>
              </div>
            </div>
          </div>
          <div className="plot-and-explanation">
            <div className="spider-plot">
              <SpiderPlot />
            </div>
            <div className="explanation-and-button">
              <div className="explanation">
                <ComparisonText />
              </div>
              <div className="control-panel">
                <Link to="/analysis">
                  <button> Back </button>
                </Link>
                <Link to="/">
                  <button onClick={this.save_and_resetGame}> End Game </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spider_data: state.analysis.spider_data,
    comp_text: state.analysis.comp_text,
    chosen_mol: state.selector.chosen_mol,
    gamemode: state.game.gamemode,
  };
}

const actionCreators = {
  resetGame: gameActions.resetGame,
  saveGame: gameActions.saveGame,
  login: userActions.login,
};

export default connect(mapStateToProps, actionCreators)(Results);
