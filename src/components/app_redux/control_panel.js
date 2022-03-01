import React from "react";
import "../app.css";
import { connect } from "react-redux";
import { saveMolecule, selectMolecule } from "../../actions";
import { Link } from "react-router-dom";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  saveMolecule = () => {
    this.props.dispatch(
      saveMolecule(this.props.saved_mols, this.props.selected_r_groups)
    );
  };

  initSelectMolecule = () => {
    this.props.dispatch(selectMolecule(Object.keys(this.props.saved_mols)[0]));
  };

 /* fetchDescriptors = () => {
    this.props.dispatch(
      fetchDescriptors(
        this.props.selected_r_groups["A"],
        this.props.selected_r_groups["B"]
      )
    );
  }; */

  //make saveMolecule call an action creator that fires 3 different actions to get all data


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
  }
}

function mapStateToProps(state) {
  return {
    selected_r_groups: state.selected_r_groups,
    saved_mols: state.saved_mols,
  };
}

export default connect(mapStateToProps)(ControlPanel);
