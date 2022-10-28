import React from "react";
import "./builder.css";
import { connect } from "react-redux";
import { selectorActions, assayActions } from "../../actions";
import { Link } from "react-router-dom";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  // save the built molecule in the store
  saveMolecule = () => {
    this.props.saveMolecule(
      this.props.saved_mols,
      this.props.selected_r_groups
    );
  };

  // set the first saved molecule as the selected molecule for the assay page
  initSelectMolecule = () => {
    this.props.selectMolecule(Object.keys(this.props.saved_mols)[0]);
  };

  combinedtwofunction = () => {
    this.saveMolecule();
    this.initSelectMolecule();
  };

  render() {

    if (this.props.saved_or_not == false) {
      return (
        <div className="control-panel">
          <button>Clear</button>
          <button onClick ={this.combinedtwofunction}>Save</button>
        </div>)
    }

    else {

      return (
        <div className="control-panel">
          <button>Clear</button>
          <button onClick={this.saveMolecule}>Save</button>
          <Link to="/assay">
            <button onClick={this.initSelectMolecule}>Assay</button>
          </Link>
        </div>)
    }
  }        
}
function mapStateToProps(state) {
  return {
    selected_r_groups: state.selector.selected_r_groups,
    saved_mols: state.assay.saved_mols,
    saved_or_not: state.assay.saved_or_not
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
  saveMolecule: assayActions.saveMolecule,
};

export default connect(mapStateToProps, actionCreators)(ControlPanel);
