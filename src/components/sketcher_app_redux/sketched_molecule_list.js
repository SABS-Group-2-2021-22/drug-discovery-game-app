import React from "react";
import "./sketcher_app.css";
import SketcherMoleculeWidget from "./sketcher_molecule_widget"
import { connect } from "react-redux";

class SketcherMoleculeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule_list">
      {(Object.keys(this.props.saved_mols).length === 0) && <center className="placeholder_text"> Draw some molecules and they appear here!</center>}
      {(Object.keys(this.props.saved_mols).length  > 0) && Array.from(
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
      saved_mols: state.assay.saved_mols,
      no_of_mols: Object.keys(state.assay.saved_mols).length
    };
}

export default connect(mapStateToProps)(SketcherMoleculeList)