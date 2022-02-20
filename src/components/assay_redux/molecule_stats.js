import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import Filters from "./filter_display.js"
import Descriptors from "./descriptor_display.js"
import Assays from "./assay_display.js"


class MoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mol-stats">
        {this.props.filters_run && <Filters />}
        {this.props.descriptors_run && <Descriptors />}
        {this.props.drug_props_run && <Assays />}
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
      state.saved_mols[state.selected_mol].data.assays_run,
    filters_run: 
      state.saved_mols[state.selected_mol].data.assays_run.filters,
    descriptors_run:
      state.saved_mols[state.selected_mol].data.assays_run.descriptors,
    drug_props_run:
      state.saved_mols[state.selected_mol].data.assays_run.drug_props,
  };
}

export default connect(mapStateToProps)(MoleculeStats)