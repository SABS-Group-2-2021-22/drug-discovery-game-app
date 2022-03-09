import React from "react";
import "../analysis.css";
import { connect } from "react-redux";
import { chooseSketchedMolecule } from "../../actions";
import { postSketchedChosen } from "../../actions";
import { Link } from "react-router-dom";

class SketcherSelectorPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  chooseMolecule = () => {
    console.log("SELECTED " + this.props.selected_mol)
    this.props.dispatch(chooseSketchedMolecule(this.props.selected_mol, this.props.saved_mols[this.props.selected_mol].data.smiles));
  }

  submitMolecule = () => {
    console.log("SELECTED " + this.props.chosen_mol)
      this.props.dispatch(postSketchedChosen(this.props.chosen_mol[0], this.props.chosen_mol[1]));
  }

  render() {
    return (
      <div className="control-panel">
        <button onClick={this.chooseMolecule}>Choose This Molecule</button>
        <Link to="/results">
          <button onClick={this.submitMolecule}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selected_mol,
    chosen_mol: state.chosen_mol,
    saved_mols: state.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherSelectorPanel);
