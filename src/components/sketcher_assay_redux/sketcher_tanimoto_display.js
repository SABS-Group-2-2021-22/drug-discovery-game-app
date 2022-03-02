import React from "react";
import "../assay.css";
import { connect } from "react-redux";

class SketcherTanimoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container" className="descriptor-stats">
        <div class="row" className="stats-type-header">
          Tanimoto Similarity:
        </div>
        <div class="row">
          = {Number(this.props.saved_mols[this.props.mol_id].data.tanimoto).toFixed(3)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_sketched_mols
  };
}

export default connect(mapStateToProps)(SketcherTanimoto);
