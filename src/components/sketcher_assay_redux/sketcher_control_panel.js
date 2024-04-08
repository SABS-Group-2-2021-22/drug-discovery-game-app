import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { sketcherActions } from "../../actions";

class SketcherControlPanel extends React.Component {
  initPlotData = () => {
    // creates object for plotting - firing it here just speeds 
    // ...things up a bit
    this.props.dispatch(sketcherActions.constructPlotObjSketcher(this.props.saved_mols));
  };

  render() {
    return ( 
      <div className="control-panel">
        <Link to="/analysis">
          <button onClick={this.initPlotData}>Analysis</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherControlPanel);
