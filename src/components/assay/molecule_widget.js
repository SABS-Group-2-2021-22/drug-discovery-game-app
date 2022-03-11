import React from "react";
import "./assay.css"
import  MoleculeImage  from "./molecule_image.js"
import MoleculeStats from "./molecule_stats_widget.js"

class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-container">
        <div className="molecule-widget">
          <MoleculeImage mol_id={this.props.mol_id} />
          <MoleculeStats mol_id={this.props.mol_id}/>
        </div>
      </div>
    );
  }
}

export default MoleculeWidget