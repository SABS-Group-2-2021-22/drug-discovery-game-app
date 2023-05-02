import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";

class SketcherDescriptors extends React.Component {
  render() {
    return (
      <div className="descriptor-stats">
        <div className="stats-type-header">
          Molecule Descriptors:
        </div>
        <div className="row">
          HA: {this.props.saved_mols[this.props.mol_id].data.descriptors.HA}
        </div>
        <div className="row">
          MW:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.MW
          ).toFixed(1)}
        </div>
        <div className="row">
          TPSA:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.TPSA
          ).toFixed(1)}
        </div>
        <div className="row">
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.h_acc}
        </div>
        <div className="row">
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.h_don}
        </div>
        <div className="row">
          logP:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.logP
          ).toFixed(1)}
        </div>
        <div className="row">
          Rings:{" "}
          {this.props.saved_mols[this.props.mol_id].data.descriptors.rings}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols
  };
}

export default connect(mapStateToProps)(SketcherDescriptors);
