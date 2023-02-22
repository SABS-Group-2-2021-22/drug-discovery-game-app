import React from "react";
import "./assay.css";
import MoleculeImage from "./molecule_image.js";
import MoleculeStats from "./molecule_stats_widget.js";
import { connect } from "react-redux"

class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selected_mol_style = {
      color: (this.props.selected_mol == this.props.mol_id ? "white" : "black"),
      backgroundColor: (this.props.selected_mol == this.props.mol_id ? "#212529" : "#FFFFFF")
    };
    return (
      <div className="molecule-container">
        <div className="molecule-widget" style={selected_mol_style}>
          <MoleculeImage mol_id={this.props.mol_id} />
          {this.props.mol_id}
          <MoleculeStats mol_id={this.props.mol_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol
  };
}

export default connect(mapStateToProps)(MoleculeWidget);