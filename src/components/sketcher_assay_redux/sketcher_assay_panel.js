import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import { runSketchedAssay } from "../../actions";

class SketcherAssayPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_assays: [],
      assays_run: null,
      selected_mol: null,
    };
  }

  componentDidMount() {
    this.setState({
      selected_mol: this.props.selected_mol,
      assays_run: this.props.assays_run,
    });
  }

  runAssays = () => {
    let assays_run = this.state.assays_run;
    let selected_assays = this.state.selected_assays;
    for (var i = 0; i < selected_assays.length; i++) {
      assays_run[selected_assays[i]] = true
    }
    console.log(assays_run)
    this.props.dispatch(
      runSketchedAssay(this.props.selected_mol, assays_run)
    );
  };

  onClick = (label) => {
    console.log(this.state.assays_run)
    let arr = this.state.selected_assays;
    if (arr.includes(label) == false){
      arr.push(label);
    }
    this.setState({ selected_assays: arr });
  };

  resetSelection = () => {
    this.setState({
      selected_assays: [],
      assays_run: this.props.assays_run,
      selected_mol: this.props.selected_mol,
    });
  };

  componentDidUpdate() {
    if (this.state.selected_mol !== this.props.selected_mol) {
      this.resetSelection();
    }
  }

  render() {
    return (
      <div className="assay-panel">
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
          label="Clearanace Humam"
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
          label="Run Lipinski Filters"
          onClick={() => {
            this.onClick("lipinski");
            this.runAssays();
          }}
        >
          Check Lipinski Rules
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
            this.onClick("drug_props")
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
    assays_run: state.saved_sketched_mols[state.selected_mol].data.assays_run,
  };
}

export default connect(mapStateToProps)(SketcherAssayPanel);