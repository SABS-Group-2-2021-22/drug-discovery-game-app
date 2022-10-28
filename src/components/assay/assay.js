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
class Assay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      help_toggle: false,
    };
  }

  toggleHelp() {
    if (this.props.toggle_help) {
      this.props.toggleHelp(false);
    } else {
      this.props.toggleHelp(true);
    }
  }
  turn_error_off = () => {
    this.props.dispatch(sketcherActions.closePopUp())
}
  render() {
      return (
        <div className="wrapper">

            {this.props.saved_or_not ? (
            <div className="assay">
            <div className="help-toggle">
              {this.props.toggle_help && (
                <div className="activebutton">
                  <button onClick={() => this.toggleHelp()}>toggle help</button>
                </div>
              )}
              {this.props.toggle_help == false && (
                <div className="inactivebutton">
                  <button onClick={() => this.toggleHelp()}>toggle help</button>
                </div>
              )}
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
    sketcher_error: state.sketcher.sketcher_error
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
};

export default connect(mapStateToProps, actionCreators)(Assay);
