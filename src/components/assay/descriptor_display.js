import React from "react";
import "./assay.css";
import { connect } from "react-redux";

class Descriptors extends React.Component {


  render() {
    return (
      <div class="container" className="descriptor-stats">
        <div className="hover-info-text-desc">
          {this.props.toggle_help && this.props.help_label == "descr" && (
            <div className="info-text">
              <p>
                <div>
                  {this.props.help[2]}{'\n'}
                  {this.props.help[3]}{'\n'}
                  {this.props.help[4]}{'\n'}
                  {this.props.help[5]}{'\n'}
                  {this.props.help[6]}{'\n'}
                  {this.props.help[7]}{'\n'}
                  {this.props.help[8]}{'\n'}
                </div>
              </p>
            </div>
          )}
        </div>
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
          ).toFixed(1)} Da
        </div>
        <div class="row">
          TPSA:{" "}
          {Number(
            this.props.saved_mols[this.props.mol_id].data.descriptors.TPSA
          ).toFixed(1)} {"Å\u00b2"}
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
          LogP:{" "}
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
    saved_mols: state.assay.saved_mols,
    help: state.init.help.build,
    toggle_help: state.assay.toggle_help,
  };
}

export default connect(mapStateToProps)(Descriptors);
