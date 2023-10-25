import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class Lipinski extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="filter-stats">
        <div class="row" className="stats-type-header">
          Date Created:
        </div>
        <div class="row">
          Week {this.props.saved_mols[this.props.mol_id].data.date_created}
        </div>
        <div class="row" className="stats-type-header">
          Lipinski Filters:
        </div>
        <div className="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.lipinski.MW ? "green" : "red" }}>
          MW:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.MW
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row" style={{ color: this.props.saved_mols[this.props.mol_id].data.lipinski.h_acc ? "green" : "red" }}>
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_acc
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row" style={{color : this.props.saved_mols[this.props.mol_id].data.lipinski.h_don ? "green" : "red"}}>
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_don
            ? "Pass"
            : "Fail"}
        </div>
        <div className="row" style={{color : this.props.saved_mols[this.props.mol_id].data.lipinski.logP ? "green" : "red"}}>
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
