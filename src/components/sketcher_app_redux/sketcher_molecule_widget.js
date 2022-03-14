import React from "react";
import "../assay/assay.css"
import { connect } from "react-redux"
import  SketcherMoleculeImage  from "./sketcher_molecule_image.js"

class SketcherMoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-container">
        <div className="molecule-widget">
          <SketcherMoleculeImage mol_id={this.props.mol_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_sketched_mols: state.sketcher.saved_sketched_mols
  };
}

export default connect(mapStateToProps)(SketcherMoleculeWidget);