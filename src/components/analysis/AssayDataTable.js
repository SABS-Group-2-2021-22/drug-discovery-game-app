import React, { useState } from 'react';
import { connect } from 'react-redux';
import MoleculeImage from "./molecule_image.js";
import "./analysis.css";

const AssayDataTable = ({ saved_mols }) => {
  const [expandedRow, setExpandedRow] = useState(null); // Track the ID of the expanded row

  const toggleRowExpansion = (mol_id) => {
    setExpandedRow(expandedRow === mol_id ? null : mol_id);
  };

  const renderRows = () => {
    // Start by defining the target compound profile row
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

    // Then map over saved_mols to create rows for each molecule
    const moleculeRows = Object.keys(saved_mols).flatMap(mol_id => {
      const molecule = saved_mols[mol_id];
      const assaysRun = molecule.data.assays_run;
      const isExpanded = expandedRow === mol_id;
      return [
        <tr key={`row-${mol_id}`} onClick={() => toggleRowExpansion(mol_id)} style={{ cursor: 'pointer' }}>
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
        isExpanded && (
          <tr key={`detail-${mol_id}`}>
            <td colSpan="6">
                <div className="molecule-image-container">
                  <MoleculeImage mol_id={mol_id} />
                </div>
            </td>
          </tr>
        )
      ];
    });

    // Combine the target profile row with the molecule rows
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
      <th>pIC50</th>
    </tr>
  );
}

const mapStateToProps = (state) => ({
  saved_mols: state.assay.saved_mols,
});

export default connect(mapStateToProps)(AssayDataTable);
