import React, { useState } from 'react';
import { connect } from 'react-redux';
import MoleculeImage from "./molecule_image.js";
import "./analysis.css";
import { selectorActions } from "../../actions"; 

const AssayDataTable = ({ saved_mols, selectMolecule, selected_mol }) => {
  

  const selectRow = (mol_id) => {
    selectMolecule(mol_id); 
  };

  const renderRows = () => {
  
    const targetProfileRow = [
      <tr key="target-profile" className="bold-separator">
        <td>Target compound profile</td>
        <td>Low (&lt; 5.6 mL/min)</td>
        <td>Low (&lt; 12 mL/min)</td>
        <td>&ge; 1.00</td>
        <td>Medium to High</td>
        <td>&ge; 6.0</td>
      </tr>
    ];

    
    const moleculeRows = Object.keys(saved_mols).flatMap(mol_id => {
      const molecule = saved_mols[mol_id];
      const assaysRun = molecule.data.assays_run;
      const isSelected = selected_mol === mol_id;
      return [
        <tr key={`row-${mol_id}`} 
        onClick={() => selectRow(mol_id)} 
        style={{ 
          cursor: 'pointer',
          borderWidth: isSelected ? '6px' : '1px',
          borderColor: isSelected ? '#b30000' : 'transparent', 
          borderStyle: isSelected ? 'solid' : 'none',
          borderRadius: isSelected ? '8px' : '0',
           }}
        >
          <td>{mol_id}</td>
          <td style={{ color: assaysRun.clearance_mouse ? (molecule.data.drug_props.clearance_mouse === "low (< 5.6)" ? 'green' : 'red') : 'black' }}>
            {assaysRun.clearance_mouse ? molecule.data.drug_props.clearance_mouse : 'N/A'}
          </td>
          <td style={{ color: assaysRun.clearance_human ? (molecule.data.drug_props.clearance_human === "low (< 12)" ? 'green' : 'red') : 'black' }}>
            {assaysRun.clearance_human ? molecule.data.drug_props.clearance_human : 'N/A'}
          </td>
          <td style={{ color: assaysRun.logd ? (molecule.data.drug_props.logd >= 1.00 ? 'green' : 'red') : 'black' }}>
            {assaysRun.logd ? molecule.data.drug_props.logd : 'N/A'}
          </td>
          <td style={{ color: assaysRun.pampa ? (molecule.data.drug_props.pampa === "med2high" ? 'green' : 'red') : 'black' }}>
            {assaysRun.pampa ? molecule.data.drug_props.pampa : 'N/A'}
          </td>
          <td style={{ color: assaysRun.pIC50 ? (molecule.data.drug_props.pic50 >= 6.0 ? 'green' : 'red') : 'black' }}>
            {assaysRun.pIC50 ? molecule.data.drug_props.pic50 : 'N/A'}
          </td>
        </tr>,
      ];
    });

    
    return [...targetProfileRow, ...moleculeRows];
  };

  return (
    <div className="assay-data-table">
      <table>
        <thead>
          {renderTableHeader()}
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};

function renderTableHeader() {
  return (
    <tr>
      <th>Compound ID</th>
      <th>Mouse Clearance (mL/min)</th>
      <th>Human Clearance (mL/min)</th>
      <th>LogD</th>
      <th>PAMPA</th>
      <th>pIC<sub>50</sub></th>
    </tr>
  );
}


const mapStateToProps = (state) => ({
  saved_mols: state.assay.saved_mols,
  selected_mol: state.selector.selected_mol, // Selected_mol is mapped from state to props
});

const mapDispatchToProps = {
  selectMolecule: selectorActions.selectMolecule, // Map the selectMolecule action creator to props
};

export default connect(mapStateToProps, mapDispatchToProps)(AssayDataTable);
