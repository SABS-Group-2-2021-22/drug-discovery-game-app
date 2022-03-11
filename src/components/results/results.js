import React from "react";
import "./results.css";
import { connect } from "react-redux";
import MoleculeImage from "./molecule_image.js";
import Assays from "./assay_display.js";
import SpiderPlot from "./spider_plot.js";
import ComparisonText from "./comparison_text.js";
import { gameActions } from "../../actions";
import { Link } from "react-router-dom";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  resetGame = () => {
    this.props.resetGame();
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
                      <MoleculeImage mol_id={this.props.chosen_mol} />
                </div>
                <div class="container" className="molecule-descriptors">
                  <Assays mol_id={this.props.chosen_mol} />
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
              <Link to="/">
                <button onClick={this.resetGame}> End Game </button>
              </Link>
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
  };
}

const actionCreators = {
  resetGame: gameActions.resetGame,
};

export default connect(mapStateToProps, actionCreators)(Results);
