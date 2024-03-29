import React from "react";
import "./results.css";
import { connect } from "react-redux";

class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  // ensure the image of the correct molecule is displayed
  srcRoute = () => {
    if (this.props.mol_id === "Roche") {
      return this.props.Roche.data.img_html;
    } else {
      return this.props.saved_mols[this.props.mol_id].data.img_html;
    }
  };

  render() {
    return (
      <div className="molecule">
        <img src={this.srcRoute()} alt="Drug" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    Roche: state.init.Roche,
  };
}

export default connect(mapStateToProps)(MoleculeImage);
