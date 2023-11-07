import React from "react";
import "./builder.css";
import { connect } from "react-redux";
import MoleculeImage from "./molecule_image.js";
import Assays from "../assay/assay_display.js";


class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-container">
        <div className="molecule-card">
          <MoleculeImage mol_id={this.props.mol_id} />
          {this.props.mol_id}
          <div className = "assay_text">
            {this.props.saved_mols[this.props.mol_id].data.assays_run
            .drug_props && <Assays mol_id={this.props.mol_id} />}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //each assay has to be individually accessed from 'assays_run' to force a component update
    saved_mols: state.assay.saved_mols,
  };
}

export default connect(mapStateToProps)(MoleculeWidget);


