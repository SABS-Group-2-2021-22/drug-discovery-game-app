import React from "react";
import "../results/results.css";
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
    saved_mols: state.sketcher.saved_sketched_mols,
    Roche: state.init.Roche,
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
