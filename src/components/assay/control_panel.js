import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { analysisActions } from "../../actions";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  initPlotData = () => {
    // creates object for plotting - firing it here just speeds 
    // ...things up a bit
    this.props.constructPlotObj(this.props.saved_mols);
  };

  render() {
    return ( 
      <div className="control-panel">
        <Link to="/build">
          <button> Back </button>
        </Link>
        <Link to="/analysis">
          <button onClick={this.initPlotData}>Analysis</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
  };
}

const actionCreators = {
  constructPlotObj: analysisActions.constructPlotObj,
}

export default connect(mapStateToProps, actionCreators)(ControlPanel);
