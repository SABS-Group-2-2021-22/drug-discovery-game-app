import React from "react";
import "../analysis/analysis.css";
import { connect } from "react-redux";

class SketcherMoleculeImage extends React.Component {
  render() {
    console.log(this.props.mol_id)
    return (
      <div className="molecule">
        <img
          src={this.props.saved_mols[this.props.mol_id].data.img_html}
          alt="Drug"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
