import React from "react";
import "./results.css";
import { connect } from "react-redux";

class Assays extends React.Component {
  constructor(props) {
    super(props);
  }

  //ensure the metrics for the correct molecule are displayed
  srcRoute = () => {
    if (this.props.mol_id === "Roche") {
      return this.props.Roche.data.drug_props;
    } else {
      return this.props.saved_mols[this.props.mol_id].data.drug_props;
    }
  };

  render() {
    return (
      <div class="container" className="assay-stats">
        <div class="row" className="stats-type-header">
          Assay Data:
        </div>
        <div class="row">pIC50: {Number(this.srcRoute().pic50)}</div>
        <div class="row">
        Mouse Clearance: {this.srcRoute().clearance_mouse}
        </div>
        <div class="row">
          Human Clearance: {this.srcRoute().clearance_human}
        </div>
        <div class="row">LogD: {this.srcRoute().logd}</div>
        <div class="row">PAMPA: {this.srcRoute().pampa}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    Roche: state.init.Roche,
  };
}

export default connect(mapStateToProps)(Assays);
