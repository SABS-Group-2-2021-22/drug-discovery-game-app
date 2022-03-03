import React from "react";
import "../assay.css";
import SketcherMoleculeWidget from "./sketcher_molecule_widget.js"
import { connect } from "react-redux";

class SketcherMoleculeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-list">
        {Array.from(
          { length: Object.keys(this.props.saved_mols).length },
          (_, i) => (
            <SketcherMoleculeWidget
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
        saved_mols: state.saved_mols
    }
}

export default connect(mapStateToProps)(SketcherMoleculeList)