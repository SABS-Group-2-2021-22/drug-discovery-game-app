import React from "react";
import "../analysis/analysis.css";
import SketcherMoleculeImage from "./sketcher_molecule_image.js";
import SketcherMoleculeStats from "./sketcher_molecule_stats.js";

class SketcherMoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.mol_id)
    return (
      <div className="molecule-container">
        <div className="molecule-widget">
          <SketcherMoleculeImage mol_id={this.props.mol_id} />
          <SketcherMoleculeStats mol_id={this.props.mol_id} />
        </div>
      </div>
    );
  };
}

export default SketcherMoleculeWidget