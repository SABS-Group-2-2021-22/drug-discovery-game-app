import React from "react";
import "../results.css";
import { connect } from "react-redux";

class SketcherMoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

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
    saved_mols: state.saved_sketched_mols,
    Roche: state.Roche,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
