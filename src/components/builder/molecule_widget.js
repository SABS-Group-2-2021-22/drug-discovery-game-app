import React from "react";
import "./builder.css";
import MoleculeImage from "./molecule_image.js";

class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-container">
        <div className="molecule-card">
          <MoleculeImage mol_id={this.props.mol_id} />
          {this.props.mol_id}
      </div>
      </div>
    );
  }
}

export default MoleculeWidget;
