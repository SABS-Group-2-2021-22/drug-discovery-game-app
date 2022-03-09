import React from "react";
import "../analysis.css";
import { connect } from "react-redux";
import SketcherFilters from "./sketcher_filter_display.js";
import SketcherDescriptors from "./sketcher_descriptor_display.js";
import SketcherTanimoto from "./sketcher_tanimoto_display.js";
import SketcherAssays from "./sketcher_assay_display.js";

class SketcherMoleculeStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mol-stats">
        {this.props.saved_mols[this.props.mol_id].data.assays_run.lipinski && (
          <SketcherFilters mol_id={this.props.mol_id} />
        )}
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .descriptors && <SketcherDescriptors mol_id={this.props.mol_id} />}
        {this.props.saved_mols[this.props.mol_id].data.assays_run
          .drug_props && <SketcherAssays mol_id={this.props.mol_id} />}
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_mols,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeStats);
