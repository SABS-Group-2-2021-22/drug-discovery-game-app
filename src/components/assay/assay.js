import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import MoleculeList from "./molecule_list.js";
import MoleculeImage from "./molecule_image.js";
import AssayPanel from "./assay_panel.js";
import MoleculeStats from "./molecule_stats.js";
import ControlPanel from "./control_panel.js";
import { assayActions } from "../../actions";
import { analysisActions } from "../../actions";
import { Link } from "react-router-dom"

class Assay extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleHelp() {
    if (this.props.toggle_help) {
      this.props.toggleHelp(false);
    } else {
      this.props.toggleHelp(true);
    }
    console.log(this.props.toggle_help)
  }

  initPlotData = () => {
    // creates object for plotting - firing it here just speeds 
    // ...things up a bit
    console.log(this.props.saved_mols);
    this.props.constructPlotObj(this.props.saved_mols);
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.saved_or_not ? (
        <div className="assay">
          <div className="molecule-chooser-bar">
            <MoleculeList />
          </div>
          <div className="main-content">
            <AssayPanel />
            <div className="nav-buttons">
              <Link to="/build">
                <button
                  label="Back_Build"
                >
                  ← Design 
                </button>
              </Link>
              <Link to="/docking">
                <button>
                  Docking →
                </button>
              </Link>
            </div>
          </div>
            </div>) : (<div className='unsavedmol'>       
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
    money: state.game.money,
    time: state.game.time,
    saved_mols: state.assay.saved_mols,
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
  constructPlotObj: analysisActions.constructPlotObj,
};

export default connect(mapStateToProps, actionCreators)(Assay);

