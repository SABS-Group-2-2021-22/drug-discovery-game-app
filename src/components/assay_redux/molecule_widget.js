import React from "react";
import "../assay.css"
import { connect } from "react-redux"
import  MoleculeImage  from "./molecule_image.js"

class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-container">
        <div className="molecule-widget">
          <MoleculeImage mol_id={this.props.mol_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_mols,
  };
}

export default connect(mapStateToProps)(MoleculeWidget);