import React from "react";
import "./results.css";
import { connect } from "react-redux";

class Assays extends React.Component {
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
      <div className="assay-stats">
        <div className="stats-type-header">
          Assay Data:
        </div>
        <div className="row">
        Mouse Clearance: {this.srcRoute().clearance_mouse}
        </div>
        <div className="row">
          Human Clearance: {this.srcRoute().clearance_human}
        </div>
        <div className="row">LogD: {this.srcRoute().logd}</div>
        <div className="row">PAMPA: {this.srcRoute().pampa}</div>
        <div className="row"><p style={{ paddingLeft: "0"}}>pIC<sub>50</sub>: {Number(this.srcRoute().pic50)}</p></div>
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
