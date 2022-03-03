import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { constructPlotObjSketcher } from "../../actions";

class SketcherControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  initPlotData = () => {
    // creates object for plotting - firing it here just speeds 
    // ...things up a bit
    this.props.dispatch(constructPlotObjSketcher(this.props.saved_mols));
  };

  render() {
    return ( 
      <div className="control-panel">
        <Link to="/sketcher-analysis">
          <button onClick={this.initPlotData}>Analysis</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.saved_mols,
  };
}

export default connect(mapStateToProps)(SketcherControlPanel);
