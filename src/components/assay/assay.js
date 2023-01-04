import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import MoleculeList from "./molecule_list.js";
import MoleculeImage from "./molecule_image.js";
import AssayPanel from "./assay_panel.js";
import MoleculeStats from "./molecule_stats.js";
import ControlPanel from "./control_panel.js";
import { assayActions } from "../../actions";
import { Link } from "react-router-dom"

class InvoiceAmount extends React.Component {
  constructor(props) {
    super(props); 
  };

  render() {
    return (
      <div className="invoice-amount">
        Running all of your assays will cost: {'\n'}
        £{this.props.cost} {'\n'} Duration: {this.props.time} weeks
      </div>
    )
  }
}

class Assay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_display: false,
      cost_assays: [],
    };
  }


  runAssays = () => {
    const ASSAY_PRICES = {
      pIC50: 70.0,
      clearance_mouse: 7000.0,
      clearance_human: 9000.0,
      logd: 1000.0,
      pampa: 700.0,
    };
    const ASSAY_TIMES = {
      pIC50: 1.0,
      clearance_mouse: 3.0,
      clearance_human: 3.5,
      logd: 1.5,
      pampa: 1.0,
    };

    // iterate through all saved molecules at once
    let max_time = 0.
    let total_cost = 0.

    for ( var molecule_key in this.props.all_molecules_assay_data ) {

      let assays_run = this.props.all_molecules_assay_data[molecule_key].data.assays_run ;
      let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

      // iterate through toggle_assay, if assay_value is true, add to selected assay
      let arr = []
      for (var key in toggle_assay_dict){
        if (toggle_assay_dict[key]) {
          arr.push(key)
        }
      }
      let selected_assays = arr;

      for (var i = 0; i < selected_assays.length; i++) {
        if (
          ["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])
        ) 
          {} 
        else {
            if (!assays_run[selected_assays[i]]){
              if (max_time < ASSAY_TIMES[selected_assays[i]]) {
                max_time = ASSAY_TIMES[selected_assays[i]] ;
              }
              total_cost = total_cost + ASSAY_PRICES[selected_assays[i]] ;
          }
        }
      }
    }
    let cost = {
      'time': max_time, 
      'money': total_cost,
  }
    return cost
  };

  toggleHelp() {
    if (this.props.toggle_help) {
      this.props.toggleHelp(false);
    } else {
      this.props.toggleHelp(true);
    }
    console.log(this.props.toggle_help)
  }
  

  invoiceDisplay() {
    if (this.state.invoice_display) {
      this.setState({invoice_display: false}) ;
    } else {
      this.setState({invoice_display: true}) ;
    }
  }




  render() {
    return (
      <div className="wrapper">
        {this.props.saved_or_not ? (
        <div className="assay">
          <div className="display-buttons-assay">
            <div className="help-toggle">
              {this.props.toggle_help && (
                <div className="toggle-activebutton">
                  <button onClick={() => this.toggleHelp()}>?</button>
                </div>
              )}
              {this.props.toggle_help == false && (
                <div className="toggle-inactivebutton">
                  <button onClick={() => this.toggleHelp()}>?</button>
                </div>
              )}
            </div>
            <div className="invoice">
              {this.state.invoice_display && (
                <div className="invoice-activebutton">
                  <button onClick={() => {this.invoiceDisplay(); }}>Hide invoice</button>
                  { (
                    <div className="info-invoice">
                      <text>
                      Currently viewing molecule {this.props.selected_mol}{"\n"}
                      </text>
                      <InvoiceAmount cost={this.runAssays().money} time={this.runAssays().time}/> 
                    </div>
                  )}
                </div>
              )}
              {this.state.invoice_display == false && (
                <div className="invoice-inactivebutton">
                  <button onClick={() => {
                    this.invoiceDisplay(); 
                    }}>
                    Invoice summary               
                  </button>
                </div>
              )}
            </div>
            </div> 
          <div className="molecule-chooser-bar">
            <MoleculeList />
          </div>
          <AssayPanel />
          <div className="mol-visbox">
            <div className="rendered-molecule">
              <MoleculeImage mol_id={this.props.selected_mol} />
            </div>
            <div className="selected-mol-stats">
                <MoleculeStats selected_mol={this.props.selected_mol} />
                <ControlPanel />
              </div>
            </div> </div>) : (<div className='unsavedmol'>       
                    <Link to="/loadingpage">
                      <button className="mk_pre_test_button">Please make a molecule before test!</button>
                    </Link></div>)
            }

        </div>
      );

  }
}
function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    toggle_help: state.assay.toggle_help,
    saved_or_not: state.assay.saved_or_not,
    all_molecules_assay_data: state.assay.saved_mols,
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
};

export default connect(mapStateToProps, actionCreators)(Assay);

