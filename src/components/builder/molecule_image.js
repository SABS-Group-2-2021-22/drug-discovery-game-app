import React from "react";
import "./builder.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";
import { analysisActions } from "../../actions";
import { sketcherActions } from "../../actions";
class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  // updates id of selected molecule in the store

  selectMolecule =  () => {
     this.props.selectMolecule(this.props.mol_id);

  };

  render() {
    return (
      <div class="molecule">
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
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    selected_or_not: state.selector.selected_or_not,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,

};

export default connect(mapStateToProps, actionCreators)(MoleculeImage);
