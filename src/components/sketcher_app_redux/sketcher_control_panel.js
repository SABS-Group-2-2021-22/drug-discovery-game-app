import React from "react";
import { Link } from "react-router-dom";
import { selectorActions } from "../../actions";
import '../builder/builder.css';
import { connect } from "react-redux";


class SketcherControlPanel extends React.Component {

initSelectMolecule = () => {
  this.props.dispatch(selectorActions.selectMolecule(Object.keys(this.props.saved_mols)[0]));
};


render() {

  if (this.props.saved_or_not === false) {
    return (
      <div className="sketcher-control-panel">
        <button>Clear</button>
        <button onClick ={this.combinedtwofunction}>Make</button>
      </div>)
  }

  else {

    return (
      <div className="sketcher-control-panel">
        <button>Clear</button>
        <button onClick={this.saveMolecule}>Make</button>
        <Link to="/assay">
          <button onClick={this.initSelectMolecule}>Test</button>
        </Link>
      </div>)
  }
}        
      }

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    saved_or_not: state.assay.saved_or_not
  };
}



export default connect(mapStateToProps) (SketcherControlPanel)