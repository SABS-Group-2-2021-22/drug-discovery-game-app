import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import { runAssay } from "../../actions";

class AssayPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assays_run: [],
    };
  }

  runAssays = () => {
    this.props.dispatch(
      runAssay(this.props.selected_mol, this.state.assays_run)
    );
  };

  onClick = (label) => {
    let arr = this.state.assays_run;
    arr.push(label);
    this.setState({ assays_run: arr });
  };

  render() {
    return (
      <div className='assay-panel'>
        <button
          label="pIC50"
          onClick={() => {
            this.onClick("pIC50");
          }}
        >
          pIC50
        </button>
        <button
          label="Clearance Mouse"
          onClick={() => {
            this.onClick("clearance_mouse");
          }}
        >
          Clearance Mouse
        </button>
        <button
          label="Clearanace Human"
          onClick={() => {
            this.onClick("clearance_human");
          }}
        >
          Clearance Human
        </button>
        <button
          label="LogD"
          onClick={() => {
            this.onClick("logd");
          }}
        >
          LogD
        </button>
        <button
          label="PAMPA"
          onClick={() => {
            this.onClick("pampa");
          }}
        >
          PAMPA
        </button>
        <button
          label="Run Filters"
          onClick={() => {
            this.onClick("filters");
            this.runAssays();
          }}
        >
          Run Filters
        </button>
        <button
          label="Calculate Descriptors"
          onClick={() => {
            this.onClick("descriptors");
            this.runAssays();
          }}
        >
          Calculate Descriptors
        </button>

        <button
          label="Run_Assays"
          onClick={() => {
            this.runAssays();
          }}
        >
          Run Assays
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        selected_mol: state.selected_mol,
    }
}

export default connect(mapStateToProps)(AssayPanel);