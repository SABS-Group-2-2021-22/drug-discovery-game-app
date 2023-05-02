import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";

class SketcherFilters extends React.Component {
  render() {
    return (
      <div className="filter-stats">
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
          logP:{" "}
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
    saved_mols: state.sketcher.saved_sketched_mols
  };
}

export default connect(mapStateToProps)(SketcherFilters);
