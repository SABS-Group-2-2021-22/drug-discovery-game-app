import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import Filters from "./lipinski_display.js";
import Descriptors from "./descriptor_display.js";
import Assays from "./assay_display.js";

class MoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mol-stats">
        {this.props.filters_run && <Filters mol_id={this.props.selected_mol} />}
        {this.props.descriptors_run && (
          <Descriptors mol_id={this.props.selected_mol} />
        )}
        {this.props.drug_props_run && (
          <Assays mol_id={this.props.selected_mol} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    filters_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.filters,
    descriptors_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.descriptors,
    drug_props_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run.drug_props,
  };
}

export default connect(mapStateToProps)(MoleculeStats);
