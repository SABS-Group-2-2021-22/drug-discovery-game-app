import React from "react";
import "../assay/assay.css";
import { connect } from "react-redux";
import { selectorActions, } from "../../actions";

class SketcherMoleculeImage extends React.Component {

  selectMolecule = () => {
    this.props.dispatch(selectorActions.selectMolecule(this.props.mol_id));
  };

  render() {
    return (
      <div className="molecule">
        <img
          src={this.props.saved_mols[this.props.mol_id].data.img_html}
          alt="Drug"
          onClick={this.selectMolecule}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.sketcher.saved_sketched_mols,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
