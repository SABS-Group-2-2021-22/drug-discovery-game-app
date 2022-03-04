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
      {(Object.keys(this.props.saved_sketched_mols).length === 0) && <div className="placeholder_text"> Draw some molecules and they appear here!</div>}
      {(Object.keys(this.props.saved_sketched_mols).length  > 0) && Array.from(
        { length: Object.keys(this.props.saved_sketched_mols).length },
        (_, i) => (
          <SketcherMoleculeWidget
            key={Object.keys(this.props.saved_sketched_mols)[i]}
            mol_id={Object.keys(this.props.saved_sketched_mols)[i]}
          />
        )
      )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        saved_sketched_mols: state.saved_sketched_mols
    }
}

export default connect(mapStateToProps)(SketcherMoleculeList)