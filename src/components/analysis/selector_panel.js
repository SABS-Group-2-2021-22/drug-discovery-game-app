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
  }

  chooseMolecule = () => {
    if (this.props.gamemode === 'builder') {this.props.chooseMolecule(this.props.selected_mol)} else {this.props.chooseSketchedMolecule(this.props.selected_mol, this.props.saved_mols[this.props.selected_mol].data.smiles)};
  };

  fetchSpider = () => {
    if (this.props.gamemode === 'builder') {this.props.fetchSpiderObj()} else {this.props.fetchSketcherSpiderObj()};
  };

  fetchCompText = () => {
    if (this.props.gamemode ==='builder') {this.props.fetchCompText()} else {this.props.fetchSketcherCompText()};
  };

  submitResult = () => {
    this.fetchSpider();
    this.fetchCompText();
  };

  render() {
    return (
      <div className="selector-panel">
        <button onClick={this.chooseMolecule}>Choose This Molecule</button>
        <Link to="/results">
          <button onClick={this.submitResult}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    chosen_mol: state.selector.chosen_mol,
    gamemode: state.game.gamemode,
  };
}

const actionCreators = {
  chooseMolecule: selectorActions.chooseMolecule,
  fetchSpiderObj: analysisActions.fetchSpiderObj,
  fetchCompText: analysisActions.fetchCompText,
  fetchSketcherSpiderObj: sketcherActions.fetchSketchedSpiderObj,
  fetchSketcherCompText: sketcherActions.fetchSketchedCompText,
  chooseSketchedMolecule: sketcherActions.chooseSketchedMolecule,
}

export default connect(mapStateToProps, actionCreators)(SelectorPanel);
