import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";

class SketcherTanimoto extends React.Component {
  render() {
    return (
      <div className="descriptor-stats">
        <div className="stats-type-header">
          Tanimoto Similarity:
        </div>
        <div className="row">
          = {Number(this.props.saved_mols[this.props.mol_id].data.tanimoto).toFixed(3)}
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

export default connect(mapStateToProps)(SketcherTanimoto);
