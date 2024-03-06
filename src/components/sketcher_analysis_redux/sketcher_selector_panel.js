import React from "react";
import "../analysis/analysis.css";
import { connect } from "react-redux";
import { sketcherActions } from "../../actions";
import { Link } from "react-router-dom";

class SketcherSelectorPanel extends React.Component {

  // chooseMolecule = () => {
  //   console.log("SELECTED " + this.props.selected_mol)
  //   this.props.dispatch(sketcherActions.chooseSketchedMolecule(this.props.selected_mol, this.props.saved_mols[this.props.selected_mol].data.smiles));
  // }

  submitMolecule = () => {
    console.log("SELECTED " + this.props.chosen_mol)
      this.props.dispatch(sketcherActions.postSketchedChosen(this.props.chosen_mol[0], this.props.chosen_mol[1]));
  }
// <button onClick={this.chooseMolecule}>Choose This Molecule</button>
  render() {
    return (
      <div className="control-panel">
        <button onClick>Choose This Molecule</button>
        <Link to="/results">
          <button onClick={this.submitMolecule}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    chosen_mol: state.selector.chosen_mol,
    saved_mols: state.sketcher.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherSelectorPanel);
