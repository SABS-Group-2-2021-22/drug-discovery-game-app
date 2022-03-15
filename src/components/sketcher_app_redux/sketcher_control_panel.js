import React from "react";
import { Link } from "react-router-dom";
import { selectorActions, sketcherActions } from "../../actions";
import '../builder/builder.css';
import { connect } from "react-redux";


class SketcherControlPanel extends React.Component {

initSelectMolecule = () => {
  this.props.dispatch(selectorActions.selectMolecule(Object.keys(this.props.saved_mols)[0]));
  console.log(Object.keys(this.props.saved_mols)[0])
};


render() {
    return (
              <div className="sketcher-control-panel">
                <button>Clear</button>
                <button onClick={this.props.triggerSaving }>Save</button>
                <Link to="/assay">
                  <button onClick={this.initSelectMolecule}>Assay</button>
                </Link>
              </div>
            )
        }
      }

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols
  };
}



export default connect(mapStateToProps) (SketcherControlPanel)