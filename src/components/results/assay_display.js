import React from "react";
import "./results.css";
import { connect } from "react-redux";

class Assays extends React.Component {
  constructor(props) {
    super(props);
  }

  //ensure the metrics for the correct molecule are displayed
  srcRoute = () => {
    if (this.props.mol_id === "Roche") {
      return this.props.Roche.data.drug_props;
    } else {
      return this.props.saved_mols[this.props.mol_id].data.drug_props;
    }
  };

  render() {

    return (
      <div class="container" className="assay-stats">
        <div class="row" className="stats-type-header">
          Assay Data:
        </div>
        <div class="row" style={{ color: this.srcRoute().clearance_mouse && this.props.Roche.data.drug_props.clearance_mouse === this.srcRoute().clearance_mouse ? "green" : "red" }}>
        Mouse Clearance:
            {this.srcRoute() ? this.srcRoute().clearance_mouse : "N/A"}
        </div>
        <div class="row" style={{ color: this.srcRoute().clearance_human && this.props.Roche.data.drug_props.clearance_human === this.srcRoute().clearance_human ? "green" : "red" }}>
          Human Clearance: 
            {this.srcRoute() ? this.srcRoute().clearance_human : "N/A"}
        </div>
        <div class="row" style={{ color: this.srcRoute().logd && this.props.Roche.data.drug_props.logd === this.srcRoute().logd ? "green" : "red" }}>
          LogD: 
          {this.srcRoute() ? this.srcRoute().logd : "N/A"}
        </div>
        <div class="row" style={{ color: this.srcRoute().pampa && this.props.Roche.data.drug_props.pampa === this.srcRoute().pampa ? "green" : "red" }}>
          PAMPA: 
          {this.srcRoute() ? this.srcRoute().pampa : "N/A"}
        </div>
        <div class="row" style={{ color: this.srcRoute().pic50 && this.props.Roche.data.drug_props.pic50 === this.srcRoute().pic50 ? "green" : "red" }}>
            <p style={{ paddingLeft: "0"}}>
              pIC<sub>50</sub>: 
                {Number(this.srcRoute() ? this.srcRoute().pic50 : "N/A")}
            </p>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    Roche: state.init.Roche,
  };
}

export default connect(mapStateToProps)(Assays);
