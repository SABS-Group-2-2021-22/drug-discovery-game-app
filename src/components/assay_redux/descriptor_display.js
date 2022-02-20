import React from "react";
import "../assay.css";
import { connect } from "react-redux";

class Descriptors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="descriptor-stats">
        <div class="row" className="stats-type-header">
          Molecule Descriptors:
        </div>
        <div class="row">HA: {this.props.descriptors.HA}</div>
        <div class="row">
          MW: {Number(this.props.descriptors.MW).toFixed(1)}
        </div>
        <div class="row">
          TPSA: {Number(this.props.descriptors.TPSA).toFixed(1)}
        </div>
        <div class="row">H Acc.: {this.props.descriptors.h_acc}</div>
        <div class="row">H Don.: {this.props.descriptors.h_don}</div>
        <div class="row">
          logP: {Number(this.props.descriptors.logP).toFixed(1)}
        </div>
        <div class="row">Rings: {this.props.descriptors.rflings}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    descriptors: state.saved_mols[state.selected_mol].data.descriptors,
  };
}

export default connect(mapStateToProps)(Descriptors);
