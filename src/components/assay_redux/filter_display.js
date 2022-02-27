import React from "react";
import "../assay.css";
import { connect } from "react-redux";

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.mol_id)
    return (
      <div class="container" className="filter-stats">
        <div class="row" className="stats-type-header">
          Lipinski Filters:
        </div>
        <div class="row">
          MW:{" "}
          {this.props.saved_mols[this.props.mol_id].data.filters.MW
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.filters.h_acc
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.filters.h_don
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          logP:{" "}
          {this.props.saved_mols[this.props.mol_id].data.filters.logP
            ? "Pass"
            : "Fail"}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_mols
  };
}

export default connect(mapStateToProps)(Filters);
