import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";

class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  selectMolecule = () => {
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
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(MoleculeImage);
