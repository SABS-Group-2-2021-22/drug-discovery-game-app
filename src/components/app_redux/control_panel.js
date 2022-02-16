import React from "react";
import "../app.css";
import { connect } from "react-redux";
import { saveMolecule } from "../../actions";
import { Link } from "react-router-dom";

class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    saveMolecule = () => {
        this.props.dispatch(saveMolecule(this.props.selected_r_groups))
    }

    render() {
        return (
          <div className="control-panel">
            <button>Clear</button>
            <button onClick={this.saveMolecule}>Save</button>
            <Link to="./../assay">
              <button>Assay</button>
            </Link>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    selected_r_groups: state.selected_r_groups,
  };
}

export default connect(mapStateToProps)(ControlPanel);