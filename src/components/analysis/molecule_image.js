import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class MoleculeImage extends React.Component {
  

  render() {
    return (
      <div className="molecule">
        <img
          src={this.props.saved_mols[this.props.mol_id].data.img_html}
          alt="Drug"
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

export default connect(mapStateToProps)(MoleculeImage);
