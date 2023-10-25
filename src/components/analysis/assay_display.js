import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class Assays extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="assay-stats">
        <div class="row" className="stats-type-header">
          Assay Data:
        </div>
        <div class="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.drug_props
            .clearance_mouse === "low (< 5.6)" ? 'green' : 'red' }} >
        Mouse Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_mouse &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_mouse}
        </div>
        <div class="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.drug_props
            .clearance_human === "low (< 12)" ? 'green' : 'red' }}>
          Human Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_human &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_human}
        </div>
        <div class="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.drug_props
            .logd <= 1.08 ? 'green' : 'red' }}>
          LogD:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.logd &&
            this.props.saved_mols[this.props.mol_id].data.drug_props.logd}
        </div>
        <div class="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.drug_props.pampa === "med2high" ? 'green' : 'red' }}>
          PAMPA:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.pampa &&
            this.props.saved_mols[this.props.mol_id].data.drug_props.pampa}
        </div>
        <div class="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.drug_props
            .pic50 === "7.7" ? 'green' : 'red' }}>
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
