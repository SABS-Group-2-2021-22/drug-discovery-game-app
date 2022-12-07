import React from "react";
import "./assay.css";
import { connect } from "react-redux";

class Assays extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="assay-stats">
        <div className="hover-info-text-assay">
          {this.props.hover == "assay" && (
            <div className="info-text">
              <p>
                <div>{this.props.help[9]}</div>
              </p>
            </div>
          )}
        </div>
        <div class="row" className="stats-type-header">
          Assay Data:
        </div>
        <div class="row">
          pIC50:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.pIC50 &&
            Number(
              this.props.saved_mols[this.props.mol_id].data.drug_props.pic50
            )}
        </div>
        <div class="row">
          Mouse Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_mouse &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_mouse}
        </div>
        <div class="row">
        Human Clearance:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run
            .clearance_human &&
            this.props.saved_mols[this.props.mol_id].data.drug_props
              .clearance_human}
        </div>
        <div class="row">
          LogD:{" "}
          {this.props.saved_mols[this.props.mol_id].data.assays_run.logd &&
            this.props.saved_mols[this.props.mol_id].data.drug_props.logd}
        </div>
        <div class="row">
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
    assays_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run,
    pIC50_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.pIC50,
    mouse_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run
        .clearance_mouse,
    human_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run
        .clearance_human,
    logd_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.logd,
    pampa_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.pampa,
    saved_mols: state.assay.saved_mols,
    help: state.init.help.assay,
  };
}

export default connect(mapStateToProps)(Assays);
