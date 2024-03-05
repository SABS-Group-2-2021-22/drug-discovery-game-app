import React from "react";
import "./analysis.css"; 
import MoleculeImage from "./molecule_image.js";
import MoleculeStats from "./molecule_stats.js"; 
import Accordion from "./accordion_analysis.js"; 
import { selectorActions } from "../../actions";
import { connect } from "react-redux";
import './accordion_analysis.css';

class MoleculeWidget extends React.Component {
  render() {
    const { mol_id, selected_mol, selectMolecule } = this.props;
    const isOpen = selected_mol === mol_id;
    
    const toggleAccordion = () => {
      selectMolecule(mol_id);
    };

    const selectedStyle = isOpen ? {
      borderWidth: "8px",
      borderColor: "#b30000", 
      padding: "5px",
    } : {};

    return (
      <div className="molecule-container">
        <Accordion title={`Molecule ${mol_id}`} isOpen={isOpen} toggleAccordion={toggleAccordion}>
          <div className="molecule-widget" style={selectedStyle}>
            <MoleculeImage mol_id={mol_id} />
            <MoleculeStats mol_id={mol_id} />
          </div>
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected_mol: state.selector.selected_mol,
});

const mapDispatchToProps = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoleculeWidget);