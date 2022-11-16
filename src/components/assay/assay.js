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
import { assayActions } from "../../actions";
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
                  <button onClick={() => this.invoiceDisplay()}>hide invoice</button>
                  { (
                    <div className="info-invoice">
                      <p>
                        <div>{this.props.invoice}</div>
                      </p>
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
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
  invoiceDisplay: assayActions.invoiceDisplay,
  showInvoice: assayActions.showInvoice,
};

export default connect(mapStateToProps, actionCreators)(Assay);
