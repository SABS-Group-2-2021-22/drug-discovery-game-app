import React from "react";
import "../analysis/analysis.css";
import { connect } from "react-redux";

class SketcherAssays extends React.Component {
  constructor(props) {
    super(props);
  }

  srcRoute = () => {
    if (this.props.mol_id === "Roche") {
      return this.props.Roche.data.drug_props;
    } else {
      return this.props.saved_mols[this.props.mol_id].data.drug_props;
    }
  };

  render() {
    return (
      <div class="container" className="assay-stats">
        <div class="row" className="stats-type-header">
          Assay Data:
        </div>
        <div class="row">
          pIC50:{" "}
          {Number(
            this.srcRoute().pic50
          )}
        </div>
        <div class="row">
          Clearance Mouse:{" "}
          {
              this.srcRoute().clearance_mouse
          }
        </div>
        <div class="row">
          Clearance Human:{" "}
          {
            this.srcRoute().clearance_human
          }
        </div>
        <div class="row">
          LogD: {this.srcRoute().logd}
        </div>
        <div class="row">
          PAMPA:{" "}
          {this.srcRoute().pampa}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols,
    Roche: state.init.Roche
  };
}

export default connect(mapStateToProps)(SketcherAssays);
