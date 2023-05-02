import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";
import SketcherAssays from "./sketcher_assay_display.js"


class SketcherMoleculeStats extends React.Component {
  render() {
    return (
      <div className="mol-stats">
        <center>
        {this.props.saved_mols[this.props.mol_id].data.assays_run.lipinski ? 
          "Lipinksi Rules Checked ✅" : "Lipinksi Rules Checked --" 
        }
        </center>
        <center>
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .descriptors ? "Descriptors Calculated ✅": "Descriptors Calculated --"}
        </center>
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .drug_props && <SketcherAssays mol_id={this.props.mol_id} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //each assay has to be individually accessed from 'assays_run' to force a component update
    saved_mols: state.sketcher.saved_sketched_mols,
    assays_run: 
    state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run,
  lipinski_run: 
    state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.lipinski,
  descriptors_run:
    state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.descriptors,
  drug_props_run:
      state.sketcher.saved_sketched_mols[state.selector.selected_mol].data.assays_run.drug_props,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeStats)