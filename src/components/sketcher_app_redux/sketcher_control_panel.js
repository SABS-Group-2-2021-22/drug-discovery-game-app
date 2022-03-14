import React from "react";
import { Link } from "react-router-dom";
import { sketcherActions } from "../../actions";
import '../builder/builder.css';
import { connect } from "react-redux";


class SketcherControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.initSelectMolecule = this.initSelectMolecule.bind(this);
}

initSelectMolecule = () => {
  this.props.dispatch(sketcherActions.selectMolecule(Object.keys(this.props.saved_mols)[0]));
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
    saved_mols: state.saved_sketched_mols
  };
}

export default connect(mapStateToProps) (SketcherControlPanel)