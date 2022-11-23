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
// import { assayActions } from "../../actions";
import { assayActions, gameActions } from "../../actions";
import { Link } from "react-router-dom"
import { sketcherActions } from "../../actions";
import Dropdown from 'react-bootstrap/Dropdown';


class Assay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice_display: false
    };
  }

  updateSubTotal = () => {
    // this.state.cost_assays, this.props.money
    this.props.updateSubTotal(this.state.cost_assays,this.state.subtotal);
  };

  calcAssays = () => {
    let toggle_assay = this.state.toggle_assay;
    let selected_assays = this.state.selected_assays;
    console.log(this.state.selected_assays)
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
    console.log('fml')
    for (var i = 0; i < selected_assays.length; i++) {
      if (
        ["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])
      ) {
      } else {
        if (this.props.money - assay_prices[selected_assays[i]] < 0) {
          this.removecostAssays(selected_assays[i]);
          this.removeselectedAssays(selected_assays[i]);
        } else if (this.props.time - assay_times[selected_assays[i]] < 0) {
          this.removecostAssays(selected_assays[i]);
          this.removeselectedAssays(selected_assays[i]);
        } else {
          toggle_assay[selected_assays[i]] = true;
          // this.updateTime();
          console.log('calcassay');
          this.updateSubTotal();
        }
      }
    }
    toggle_assay["drug_props"] = true;
    this.resetCostAssays();
    this.props.calcAssay(this.props.selected_mol, toggle_assay);
  };
  
  // calcAssays = () => {
  //   let toggle_assay = this.state.toggle_assay;
  //   let selected_assays = this.state.selected_assays;
  //   const assay_prices = {
  //     pIC50: 70.0,
  //     clearance_mouse: 7000.0,
  //     clearance_human: 9000.0,
  //     logd: 1000.0,
  //     pampa: 700.0,
  //   };
  //   const assay_times = {
  //     pIC50: 1.0,
  //     clearance_mouse: 3.0,
  //     clearance_human: 3.5,
  //     logd: 1.5,
  //     pampa: 1.0,
  //   };
  //   console.log(selected_assays)
  //   for (var i = 0; i < selected_assays.length; i++) {
  //     if (
  //       ["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])
  //     ) {
  //     } else {
  //       if (this.props.money - assay_prices[selected_assays[i]] < 0) {
  //         this.removecostAssays(selected_assays[i]);
  //         this.removeselectedAssays(selected_assays[i]);
  //       } else if (this.props.time - assay_times[selected_assays[i]] < 0) {
  //         this.removecostAssays(selected_assays[i]);
  //         this.removeselectedAssays(selected_assays[i]);
  //       } else {
  //         toggle_assay[selected_assays[i]] = true;
  //         // this.updateTime();
  //         this.updateSubTotal();
  //       }
  //     }
  //   }
  //   // assays_run["drug_props"] = true;
  //   this.resetCostAssays();
  //   this.props.calcAssay(this.props.selected_mol, toggle_assay);
  // };
  
  onShow = (event) => {
    this.setState({ click: true });
    console.log(this.props.help);
  };

  onHide = (event) => {
    this.setState({ click: false });
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
    // console.log(this.props.subtotal)
    // console.log(this.props.saved_mols[this.props.mol_id].data.assays_run)
    
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
    // var heading = ['ASSAY', 'COST']
    // var body =[]
    // console.log(this.props.selected_assays)
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
                  <button onClick={() => {this.invoiceDisplay(); this.calcAssays();}}>hide invoice</button>
                  { (
                    <div className="info-invoice">
                      placeholder
                      {/* <table className="invoice-table">
                      <th>Molecule Selected: {this.props.selected_mol}</th>
                        {/* <tr>Assay:{this.props.toggle_assay.pic50}</tr> */}
                        {/* <tr>Cost: {this.props.subtotal}</tr> */}


                      {/* </table> */} 

                    </div>
                  )}
                </div>
              )}
              {this.props.invoice_display == false && (
                <div className="invoice-inactivebutton">
                  <button onClick={() => {this.invoiceDisplay(); this.showInvoice();}}>
                    show invoice                 
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
    
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
  invoiceDisplay: assayActions.invoiceDisplay,
  showInvoice: assayActions.showInvoice,
  // updateSubTotal: gameActions.updateSubTotal,
  
};

export default connect(mapStateToProps, actionCreators)(Assay);

