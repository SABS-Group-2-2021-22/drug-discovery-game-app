import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class Lipinski extends React.Component {
  render() {
    return (
      <div className="filter-stats">
        <div className="stats-type-header">
          Date Created:
        </div>
        <div className="row">
          Week {this.props.saved_mols[this.props.mol_id].data.date_created}
        </div>
        <div className="stats-type-header">
          Lipinski Filters:
        </div>
        <div className="row">
          MW:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.MW
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row">
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_acc
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row">
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_don
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row">
          LogP:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.logP
            ? "Pass"
            : "Fail"}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols
  };
}

export default connect(mapStateToProps)(Lipinski);
