import React from "react";
import "../analysis.css";
import { connect } from "react-redux";
import { chooseMolecule, postChosen } from "../..actions";

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  chooseMolecule = () => {
    this.props.dispatch(chooseMolecule(this.props.selected_mol));
  }

  submitMolecule = () => {
      this.props.dispatch(postChosen(this.props.chosen_mol));
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
  };
}

export default connect(mapStateToProps)(SelectorPanel);
