import React from "react";
import "./analysis.css";
import { connect } from "react-redux";

class Descriptors extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    //set *varible*_value to its corresponding value for each varibale, called from their respective classes
    const HA_value = this.props.saved_mols[this.props.mol_id].data.descriptors.HA;
    const MW_value = Number(this.props.saved_mols[this.props.mol_id].data.descriptors.MW).toFixed(1);
    const TPSA_value = Number(this.props.saved_mols[this.props.mol_id].data.descriptors.TPSA).toFixed(1);
    const h_acc_value = this.props.saved_mols[this.props.mol_id].data.descriptors.h_acc;
    const h_don_value = this.props.saved_mols[this.props.mol_id].data.descriptors.h_don;
    const LogP_value = Number(this.props.saved_mols[this.props.mol_id].data.descriptors.logP).toFixed(1);

    //let "colour" be what it should be if value is LOW, 
    //first if statement changing to what it should be if it is HIGH
    //second if statement is the lower bound of NEUTRAL

    let HA_color = "red";
    if (HA_value >= 6) {
      HA_color = "green";
    } else if (HA_value >= 4) {
      HA_color = "orange";
    }

    let MW_color = "red";
    if (MW_value >= 700) {
      MW_color = "green";
    } else if (MW_value >= 500) {
      MW_color = "orange";
    }
    
    let TPSA_color = "green";
    if (TPSA_value >= 140) {
      TPSA_color = "red";
    } else if (TPSA_value >= 90) {
      TPSA_color = "orange";
    }
    
    let h_acc_color = "green";
    if (h_acc_value >= 10) {
      h_acc_color = "red";
    } else if (h_acc_value >= 3) {
      h_acc_color = "orange";
    }
    
    let h_don_color = "green";
    if (h_don_value >= 5) {
      h_don_color = "red";
    } else if (h_don_value >= 3) {
      h_don_color = "orange";
    }
    
    let LogP_color = "green";
    if (LogP_value >= 5) {
      LogP_color = "red";
    } else if (LogP_value >= 3) {
      LogP_color = "orange";
    }
  
    //return the variable_values in with the correct colours based on thresholds above
    return (
      <div class="container" className="descriptor-stats">
        <div class="row" className="stats-type-header">
          Molecule Descriptors:
        </div>
        <div class="row" style={{ color: HA_color }}>
          HA: {HA_value}
        </div>
        <div class="row" style={{ color: MW_color }}>
          MW: {MW_value} Da
        </div>
        <div class="row" style={{ color: TPSA_color }}>
          TPSA: {TPSA_value} {"Å\u00b2"}
        </div>
        <div class="row" style={{ color: h_acc_color }}>
          H Acc.: {h_acc_value}
        </div>
        <div class="row" style={{ color: h_don_color }}>
          H Don.: {h_don_value}
        </div>
        <div class="row" style={{ color: LogP_color }}>
          LogP: {LogP_value}
        </div>
      </div>
    );
  }
}



  function mapStateToProps(state) {
    return {
      saved_mols: state.assay.saved_mols
    };
  }
  
  export default connect(mapStateToProps)(Descriptors);


