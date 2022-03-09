import React from "react";
import "../app.css";
import { connect } from "react-redux";
import { selectorActions, assayActions } from "../../actions";
import { Link } from "react-router-dom";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  saveMolecule = () => {
    
      this.props.saveMolecule(this.props.saved_mols, this.props.selected_r_groups)
    ;
  };

  initSelectMolecule = () => {
    this.props.selectMolecule(Object.keys(this.props.saved_mols)[0]);
  };

  render() {
    return (
      <div className="control-panel">
        <button>Clear</button>
        <button onClick={this.saveMolecule}>Save</button>
        <Link to="/assay">
          <button onClick={this.initSelectMolecule}>Assay</button>
        </Link>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    selected_r_groups: state.selected_r_groups,
    saved_mols: state.saved_mols,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
  saveMolecule: assayActions.saveMolecule,
}

export default connect(mapStateToProps, actionCreators)(ControlPanel);
