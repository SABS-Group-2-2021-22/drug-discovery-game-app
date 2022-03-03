import React from "react";
import "../assay.css";
import { connect } from "react-redux";

class SketcherDescriptors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="descriptor-stats">
        <div class="row" className="stats-type-header">
          Molecule Descriptors:
        </div>
        <div class="row">
          HA: {this.props.saved_mols[this.props.mol_id].data.descriptors.HA}
        </div>
        <div class="row">
          MW:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.MW
          ).toFixed(1)}
        </div>
        <div class="row">
          TPSA:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.TPSA
          ).toFixed(1)}
        </div>
        <div class="row">
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.h_acc}
        </div>
        <div class="row">
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.h_don}
        </div>
        <div class="row">
          logP:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.logP
          ).toFixed(1)}
        </div>
        <div class="row">
          Rings:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.rings}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_mols
  };
}

export default connect(mapStateToProps)(SketcherDescriptors);
