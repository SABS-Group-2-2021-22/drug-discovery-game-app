import React from "react";
import "./analysis.css";
import { connect } from "react-redux";
import Filters from "./filter_display.js";
import Descriptors from "./descriptor_display.js";
import Assays from "./assay_display.js";

class MoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mol-stats">
        {this.props.saved_mols[this.props.mol_id].data.assays_run.filters && (
          <Filters mol_id={this.props.mol_id} />
        )}
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .descriptors && <Descriptors mol_id={this.props.mol_id} />}
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .drug_props && <Assays mol_id={this.props.mol_id} />}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
  };
}

export default connect(mapStateToProps)(MoleculeStats);
