import React from "react";
import "./builder.css";
import { connect } from "react-redux";
import MoleculeImage from "./molecule_image.js";
import Assays from "../assay/assay_display.js";


class MoleculeWidget extends React.Component {

  render() {
    // Check if there is any assay data for the specified molecule ID
    const assayData =
      this.props.saved_mols[this.props.mol_id] &&
      this.props.saved_mols[this.props.mol_id].data.assays_run;

    // Check if there is data for at least one of pIC50, clearance_mouse, clearance_human, logd, or pampa
    const hasAssayData =
      assayData &&
      (assayData.pIC50 ||
        assayData.clearance_mouse ||
        assayData.clearance_human ||
        assayData.logd ||
        assayData.pampa);
    return (
      <div className="molecule-container">
        <div className="molecule-card">
          <MoleculeImage mol_id={this.props.mol_id} />
          {this.props.mol_id}
          <div className = "assay_text">
            {hasAssayData && <Assays mol_id={this.props.mol_id} />}
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


