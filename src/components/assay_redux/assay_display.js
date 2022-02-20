import React from "react";
import "../assay.css";
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
        <div class="row">
          pIC50: {this.props.pIC50_run && Number(this.props.assays.pic50)}
        </div>
        <div class="row">
          Clearance Mouse:{" "}
          {this.props.mouse_run && this.props.assays.clearance_mouse}
        </div>
        <div class="row">
          Clearance Human:{" "}
          {this.props.human_run && this.props.assays.clearance_human}
        </div>
        <div class="row">
          LogD: {this.props.logd_run && this.props.assays.logd}
        </div>
        <div class="row">
          PAMPA: {this.props.pampa_run && this.props.assays.pampa}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //each assay has to be individually accessed from 'assays_run' to force a component update
    assays: 
        state.saved_mols[state.selected_mol].data.drug_props,
    pIC50_run: 
        state.saved_mols[state.selected_mol].data.assays_run.pIC50,
    mouse_run:
      state.saved_mols[state.selected_mol].data.assays_run.clearance_mouse,
    human_run:
      state.saved_mols[state.selected_mol].data.assays_run.clearance_human,
    logd_run: 
        state.saved_mols[state.selected_mol].data.assays_run.logd,
    pampa_run:
        state.saved_mols[state.selected_mol].data.assays_run.pampa
  };
}

export default connect(mapStateToProps)(Assays)