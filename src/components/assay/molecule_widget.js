import React from "react";
import "./assay.css";
import MoleculeImage from "./molecule_image.js";
import MoleculeStats from "./molecule_stats_widget.js";
import Accordion from "./Accordion.js";
import './accordion.css';


class MoleculeWidget extends React.Component {
  render() {
    const { mol_id } = this.props;

    return (
      <div className="molecule-container">
        <Accordion title={`Molecule ${mol_id}`}>
          <div className="molecule-widget">
            <MoleculeImage mol_id={mol_id} />
            <MoleculeStats mol_id={mol_id} />
          </div>
        </Accordion>
      </div>
    );
  }
}

export default MoleculeWidget;


