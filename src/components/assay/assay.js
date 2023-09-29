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
    this.state = {
      hover: [],
    };
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

  onHover = (label) => {
    this.setState({ hover: label });
  };

  onUnHover = () => {
    this.setState({ hover: [] });
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.saved_or_not ? (
        <div className="assay">
          <div className="molecule-chooser-bar"        
            onMouseEnter={() => {
            this.onHover("lipinski");
          }}
          onMouseLeave={() => {
            this.onUnHover();
          }}>
          {this.state.hover == "lipinski" && this.props.toggle_help && (
          <div className="hover-info-text-help-large">
            <p>
              <div>{this.props.help[7]}</div>
              <div>{this.props.help[8]}</div>
            </p>
          </div>
          )}
            <MoleculeList />
          </div>
          <div className="main-content">
            <AssayPanel />
            <div className="nav-buttons">
              <Link to="/docking">
                <button
                  label="Back_Build"
                >
                  ← Docking 
                </button>
              </Link>
              <Link to="/analysis">
                <button>
                  Analysis →
                </button>
              </Link>
            </div>
          </div>
            </div>) : (<div className='unsavedmol'>       
                    <Link to="/loadingpage">
                      <button className="mk_pre_test_button">Go back to design your molecules first!</button>
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
    help: state.init.help.assay,
  };
}

const actionCreators = {
  toggleHelp: assayActions.toggleHelp,
  constructPlotObj: analysisActions.constructPlotObj,
};

export default connect(mapStateToProps, actionCreators)(Assay);

