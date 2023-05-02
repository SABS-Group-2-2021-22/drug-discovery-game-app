import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class Assays extends React.Component {
  render() {
    return (
      <div className="assay-stats">
        <div className="stats-type-header">
          Assay Data:
        </div>
        <div className="row">
        Mouse Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_mouse &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_mouse}
        </div>
        <div className="row">
          Human Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_human &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_human}
        </div>
        <div className="row">
          LogD:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.logd &&
            this.props.saved_mols[this.props.mol_id].data.drug_props.logd}
        </div>
        <div className="row">
          PAMPA:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.pampa &&
            this.props.saved_mols[this.props.mol_id].data.drug_props.pampa}
        </div>
        <div className="row">
          <p style={{ paddingLeft: "0"}}>pIC<sub>50</sub>:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.pIC50 &&
            Number(
              this.props.saved_mols[this.props.mol_id].data.drug_props.pic50
            )}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
  };
}

export default connect(mapStateToProps)(Assays);
