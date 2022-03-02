import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import SketcherFilters from "./sketcher_filter_display.js"
import SketcherDescriptors from "./sketcher_descriptor_display.js"


class SketcherMoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mol-stats">
        {this.props.filters_run && (
          <SketcherFilters mol_id={this.props.selected_mol} />
        )}
        {this.props.descriptors_run && (
          <SketcherDescriptors mol_id={this.props.selected_mol} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //each assay has to be individually accessed from 'assays_run' to force a component update
    selected_mol: 
      state.selected_mol,
    assays_run: 
      state.saved_sketched_mols[state.selected_mol].data.assays_run,
    filters_run: 
      state.saved_sketched_mols[state.selected_mol].data.assays_run.filters,
    descriptors_run:
      state.saved_sketched_mols[state.selected_mol].data.assays_run.descriptors,
    drug_props_run:
      state.saved_sketched_mols[state.selected_mol].data.assays_run.drug_props,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeStats)