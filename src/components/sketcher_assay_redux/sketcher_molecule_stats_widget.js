import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";
import SketcherFilters from "./sketcher_filter_display.js"
import SketcherAssays from "./sketcher_assay_display.js"
import SketcherDescriptors from "./sketcher_descriptor_display.js"
import SketcherTanimoto from "./sketcher_tanimoto_display.js"


class SketcherMoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

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
    saved_mols: state.saved_sketched_mols,
    assays_run: 
    state.saved_sketched_mols[state.selected_mol].data.assays_run,
  lipinski_run: 
    state.saved_sketched_mols[state.selected_mol].data.assays_run.lipinski,
  descriptors_run:
    state.saved_sketched_mols[state.selected_mol].data.assays_run.descriptors,
  drug_props_run:
      state.saved_sketched_mols[state.selected_mol].data.assays_run.drug_props,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeStats)