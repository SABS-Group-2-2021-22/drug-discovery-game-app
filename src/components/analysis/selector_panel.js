import React from "react";
import "./analysis.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";
import { analysisActions } from "../../actions";
import { sketcherActions } from "../../actions";
import { Link } from "react-router-dom";

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpHover: false,
    };
  }

  // Fire the chooseMolecule or chooseSketcherMolecule (mode dependent) when
  // ...the choose molecule button is clicked
  chooseMolecule = () => {
    if (this.props.gamemode === "builder") {
      this.props.chooseMolecule(this.props.selected_mol);
    } else {
      this.props.chooseSketchedMolecule(
        this.props.selected_mol,
        this.props.saved_mols[this.props.selected_mol].data.smiles
      );
    }
    this.fetchSpider();
    this.fetchCompText();
  };

  // retrieve data for the spider plot on the results page
  fetchSpider = () => {
    if (this.props.gamemode === "builder") {
      this.props.fetchSpiderObj();
    } else {
      this.props.fetchSketcherSpiderObj();
    }
  };

  // retrieve data for the comparison text on the results page
  fetchCompText = () => {
    if (this.props.gamemode === "builder") {
      this.props.fetchCompText();
    } else {
      this.props.fetchSketcherCompText();
    }
  };

  onHelpHover = (event) => {
    this.setState({ helpHover: true });
  };

  onUnHelpHover = (event) => {
    this.setState({ helpHover: false });
  };

  render() {
    return (
        <div className="selector-panel">
          <button
            className="help-button"
            onMouseEnter={this.onHelpHover}
            onMouseLeave={this.onUnHelpHover}
          >
            ?
        </button>
        {this.state.helpHover && (
            <div className="help-info-text">
              <p>
                <div>{this.props.help[1]}</div>
              </p>
            </div>
          )}
        <div className="selector-panel-select-button">
          <Link to="/results">
              <button onClick={this.chooseMolecule}> Select Final Candidate</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    selected_or_not: state.selector.selected_or_not,
    chosen_mol: state.selector.chosen_mol,
    gamemode: state.game.gamemode,
    help: state.init.help.analysis,
  };
}

const actionCreators = {
  chooseMolecule: selectorActions.chooseMolecule,
  fetchSpiderObj: analysisActions.fetchSpiderObj,
  fetchCompText: analysisActions.fetchCompText,
  fetchSketcherSpiderObj: sketcherActions.fetchSketchedSpiderObj,
  fetchSketcherCompText: sketcherActions.fetchSketchedCompText,
  chooseSketchedMolecule: sketcherActions.chooseSketchedMolecule,
};

export default connect(mapStateToProps, actionCreators)(SelectorPanel);
