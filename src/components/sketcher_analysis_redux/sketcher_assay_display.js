import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";

class SketcherAssays extends React.Component {
  render() {
    return (
      <div className="assay-stats">
        <div className="stats-type-header">
          Assay Data:
        </div>
        <div className="row">
          pIC50:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.pIC50 &&
            Number(
              this.props.saved_mols[this.props.mol_id].data.drug_props.pic50
            )}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //each assay has to be individually accessed from 'assays_run' to force a component update
    // ...simply throwing saved_mols in as a prop is not sufficient
    pIC50_run: state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.pIC50,
    mouse_run:
      state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.clearance_mouse,
    human_run:
      state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.clearance_human,
    logd_run: state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.logd,
    pampa_run: state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.pampa,
    saved_mols: state.sketcher.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherAssays);
