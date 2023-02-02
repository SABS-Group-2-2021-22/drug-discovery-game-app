import React from "react";
import "./assay.css";
import { connect } from "react-redux";

class Lipinski extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="lipinski-stats">
        <div className="hover-info-text-lip">
          {this.props.toggle_help && this.props.help_label == "lip" && (
            <div className="info-text">
              <p>
                <div>{this.props.help[8]}</div>
              </p>
            </div>
          )}
        </div>
        <div class="row" className="stats-type-header">
          Lipinski Rules:
        </div>
        <div class="row">
          MW:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.MW
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          H Acc.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_acc
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          H Don.:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.h_don
            ? "Pass"
            : "Fail"}
        </div>
        <div class="row">
          logP:{" "}
          {this.props.saved_mols[this.props.mol_id].data.lipinski.logP
            ? "Pass"
            : "Fail"}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    help: state.init.help.assay,
    toggle_help: state.assay.toggle_help,
  };
}

export default connect(mapStateToProps)(Lipinski);
