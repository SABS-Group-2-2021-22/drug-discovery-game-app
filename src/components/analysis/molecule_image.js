import React from "react";
import "./analysis.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";

class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  // fires the selectMolecule action when clicking the molecule's image
  selectMolecule = () => {
    this.props.selectMolecule(this.props.mol_id);
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
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    selected_or_not: state.selector.selected_or_not,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(MoleculeImage);
