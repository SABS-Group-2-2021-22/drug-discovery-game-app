import React from "react";
import "./builder.css";
import MoleculeWidget from "./molecule_widget.js"
import { connect } from "react-redux";

class MoleculeList extends React.Component {

  render() {
    return (
      <div className="molecule-list">
        {Array.from(
          { length: Object.keys(this.props.saved_mols).length },
          (_, i) => (
            <MoleculeWidget
              key={Object.keys(this.props.saved_mols)[i]}
              mol_id={Object.keys(this.props.saved_mols)[i]}
            />
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        saved_mols: state.assay.saved_mols
    }
}

export default connect(mapStateToProps)(MoleculeList)