import React from "react";
import "../assay.css";
import { connect } from "react-redux";
import { assayActions, gameActions } from "../../actions";

class AssayPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_assays: [],
      assays_run: null,
      selected_mol: null,
      cost_assays: [],
    };
  }

  componentDidMount() {
    this.setState({
      selected_mol: this.props.selected_mol,
      assays_run: this.props.assays_run,
    });
  }

  costAssays = (assay) => {
    let arr = this.state.cost_assays;
    arr.push(assay);
    this.setState({ cost_assays: arr });
  };

  resetCostAssays = () => {
    this.setState({ cost_assays: [] });
  };

  updateTime = () => {
    this.props.updateTime(this.state.cost_assays, this.props.time);
  };

  updateMoney = () => {
    this.props.updateMoney(this.state.cost_assays, this.props.money);
  };

  runAssays = () => {
    let assays_run = this.state.assays_run;
    let selected_assays = this.state.selected_assays;
    for (var i = 0; i < selected_assays.length; i++) {
      assays_run[selected_assays[i]] = true;
    }
    this.updateTime();
    this.updateMoney();
    this.resetCostAssays();
    this.props.runAssay(this.props.selected_mol, assays_run);
  };

  onClick = (label) => {
    let arr = this.state.selected_assays;
    if (arr.includes(label) == false) {
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
      this.resetCostAssays();
    }
  }

  render() {
    return (
      <div className="assay-panel">
        <button
          label="pIC50"
          onClick={() => {
            this.onClick("pIC50");
            this.costAssays("pIC50");
          }}
        >
          pIC50
        </button>
        <button
          label="Clearance Mouse"
          onClick={() => {
            this.onClick("clearance_mouse");
            this.costAssays("clearance_mouse");
          }}
        >
          Clearance Mouse
        </button>
        <button
          label="Clearanace Humam"
          onClick={() => {
            this.onClick("clearance_human");
            this.costAssays("clearance_human");
          }}
        >
          Clearance Human
        </button>
        <button
          label="LogD"
          onClick={() => {
            this.onClick("logd");
            this.costAssays("logd");
          }}
        >
          LogD
        </button>
        <button
          label="PAMPA"
          onClick={() => {
            this.onClick("pampa");
            this.costAssays("pampa");
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
            this.onClick("drug_props");
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
    assays_run: state.saved_mols[state.selected_mol].data.assays_run,
    time: state.time,
    money: state.money,
  };
}

const actionCreators = {
  updateMoney: gameActions.updateMoney,
  updateTime: gameActions.updateTime,
  runAssay: assayActions.runAssay,
};

export default connect(mapStateToProps, actionCreators)(AssayPanel);
