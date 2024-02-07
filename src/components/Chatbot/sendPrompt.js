//sendPrompt.js

import React from 'react';
import { connect } from "react-redux";
import { sendPrompt } from '../../api/index.js'; 




export async function sendPromptToLLMExternal() {
  const myMolecule = this.props.saved_mols[this.props.selected_mol].data.drug_props;
  const rocheMolecule = this.props.Roche.data.drug_props;
    // Directly using myMolecule and rocheMolecule to construct the data strings
    const myMoleculeData = `Mouse clearance: ${myMolecule.clearance_mouse}, Human clearance: ${myMolecule.clearance_human}, logD: ${myMolecule.logd}, PAMPA: ${myMolecule.pampa}, pIC50: ${myMolecule.pic50}`;
    const rocheMoleculeData = `Mouse clearance: ${rocheMolecule.clearance_mouse}, Human clearance: ${rocheMolecule.clearance_human}, logD: ${rocheMolecule.logd}, PAMPA: ${rocheMolecule.pampa}, pIC50: ${rocheMolecule.pic50}`;

    const prompt = `I am designing a drug to bind a target molecule. My binding molecule is a dipeptide which consists of two R groups. My test results are: ${myMoleculeData}. The ideal test results are ${rocheMoleculeData}. Explain my results to me and what I can do in order to get test results which are closer to the ideal test result. For example, this could include telling me whether I should increase or decrease molecular weight, charge, hydrophobicity or other properties of amino acids.`;
    
    console.log("Sending prompt to backend:", prompt);
    let response = await sendPrompt(prompt);
    console.log("Received response:", response.data);
    return response.data;
}


function mapStateToProps(state) {
    return {
      Roche: state.init.Roche,
      selected_mol: state.selector.selected_mol,
      saved_mols: state.assay.saved_mols,
      selected_or_not: state.selector.selected_or_not,
    };
}

export default connect(mapStateToProps)(sendPrompt);
