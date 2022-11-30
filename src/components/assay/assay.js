import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Text} from "react-native";
import "./assay.css";
import { connect } from "react-redux";
import MoleculeList from "./molecule_list.js";
import MoleculeImage from "./molecule_image.js";
import AssayPanel from "./assay_panel.js";
import MoleculeStats from "./molecule_stats.js";
import ControlPanel from "./control_panel.js";
import { assayActions, gameActions } from "../../actions";
import { Link } from "react-router-dom"
import { sketcherActions } from "../../actions";
import Dropdown from 'react-bootstrap/Dropdown';


class Assay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_display: false,
      cost_assays: [],
    };
  }

  calcAssays = () => {
    let assays_run = this.state.assays_run;
    // iterate through toggle_assay, if assay_value is true, add to selected assay
    let arr = []
    let toggle_assay_dict = this.props.toggle_assay;
    for (var key in toggle_assay_dict){
      if (toggle_assay_dict[key] && !(key in arr)) {
        arr.push(key)
      }
    }
    console.log(arr)
    let selected_assays = arr;
    
    const assay_prices = {
      pIC50: 70.0,
      clearance_mouse: 7000.0,
      clearance_human: 9000.0,
      logd: 1000.0,
      pampa: 700.0,
    };
    const assay_times = {
      pIC50: 1.0,
      clearance_mouse: 3.0,
      clearance_human: 3.5,
      logd: 1.5,
      pampa: 1.0,
    };
    console.log(selected_assays)
    this.props.updateSubTotal(selected_assays,this.props.subtotal)
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
    if (this.props.invoice_display) {
      this.props.invoiceDisplay(false);
    } else {
      this.props.invoiceDisplay(true);
    }
    console.log(this.props.invoice_display)
    console.log(this.props.toggle_assay)    
  }


  showInvoice() {
    if (this.props.invoice) {
      this.props.showInvoice(false);
    } else {
      this.props.showInvoice(true);
    }
    console.log(this.props.invoice)
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
                  <button onClick={() => this.toggleHelp()}>toggle help: ON</button>
                </div>
              )}
              {this.props.toggle_help == false && (
                <div className="toggle-inactivebutton">
                  <button onClick={() => this.toggleHelp()}>toggle help: OFF</button>
                </div>
              )}
            </div>
            <div className="invoice">
              {this.props.invoice_display && (
                <div className="invoice-activebutton">
                  <button onClick={() => {this.invoiceDisplay(); }}>hide invoice</button>
                  { (
                    <div className="info-invoice">
                      <table className="invoice-table">
                      <th>Molecule Selected: {this.props.selected_mol}</th>
                        {/* <tr>Assay:{this.props.toggle_assay.pic50}</tr> */}
                        <tr>Cost for assays: £{this.props.subtotal}</tr>
                        <tr>----------------------------------------</tr>
                        <small>* If you have updated the list of assays you have planned to run, 
                        double click 'hide invoice' to update the invoice * </small>
                      </table> 
                    </div>
                  )}
                </div>
              )}
              {this.props.invoice_display == false && (
                <div className="invoice-inactivebutton">
                  <button onClick={() => {this.invoiceDisplay(); this.showInvoice();this.calcAssays();}}>
                    update invoice                 
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
                    <Link to="/build">
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
    sketcher_error: state.sketcher.sketcher_error,
    invoice_display: state.assay.invoice_display,
    invoice: state.assay.invoice,
    selected_assays: state.assay.selected_assays,
    toggle_assay: state.assay.saved_mols[state.selector.selected_mol].data.toggle_assay,
    money: state.game.money,
    subtotal: state.game.subtotal,
    cost_assays: state.assay.cost_assays
    
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
  invoiceDisplay: assayActions.invoiceDisplay,
  showInvoice: assayActions.showInvoice,
  updateSubTotal: gameActions.updateSubTotal,
  
};

export default connect(mapStateToProps, actionCreators)(Assay);

