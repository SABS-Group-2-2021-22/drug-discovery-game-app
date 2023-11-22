// Import necessary modules and components
import React from "react";                          // Importing the main React library
import "./docking.css";                            // Importing styles specific to this Docking component
import { Link } from "react-router-dom";           // Importing 'Link' from react-router-dom to navigate between views
import { connect } from "react-redux";             // Importing connect function from react-redux to bind Redux store to this component
import { initActions, selectorActions, gameActions, analysisActions } from "../../actions"; // Importing various action creators
import MoleculeList from "../analysis/molecule_list.js"; // Importing the MoleculeList component
import Molstar from "molstar-react";               // Importing Molstar component(a molecule viewer)

// Define the main Docking component
class Docking extends React.Component {
  // Constructor to set initial state and bind methods
  constructor(props) {
    super(props);
    this.state = {
      toggle_controls: false,                      // Initial state for toggle_controls set to false
    };
  }

  toggleHelp = (event) => {
    console.log(this.state.toggle_help)
    if (this.state.toggle_help) {
      this.setState({ toggle_help: false });
    }
    else {
      this.setState({ toggle_help: true });
    }
  };

  // Method to initialize plot data
  initPlotData = () => {
    // This method is constructing an object for plotting using the saved_mols prop
    this.props.constructPlotObj(this.props.saved_mols);
  };

  // Render method defines the UI of the component
  render() {
    // Define a URL which is used to fetch molecule data
    let url = `http://localhost:5000/docking-${this.props.selected_mol}dock1_concatenated.pdb`;

    // Define properties for the Molstar component
    let molstar_props = {
      url: url,                                  // The URL where the molecule data is fetched
      showControls: false,                       // Don't show controls for the Molstar viewer
      useInterface: true,                        // Use interface for the Molstar viewer
    };

    // Return the JSX that defines the UI
    return (
      <div className="wrapper">
      {this.props.saved_or_not ? (
        <div className="docking-elements">
          <div className="mol-list">
            <MoleculeList /> 
            <div className="hover-info">
              <button onClick={this.toggleHelp}>
                ?
              </button>
              {this.state.toggle_help && (
                <div className="info-text">
                  <p>
                  {"\n"}
                  <div>{this.props.help[10]}</div>
                  <div>{this.props.help[11]}</div>
                  <div>{this.props.help[12]}</div>
                  <div>{this.props.help[13]}</div>
                  <div>{this.props.help[14]}</div>
                  <div>{this.props.help[15]}</div>
                  <div>{this.props.help[16]}</div>
                  {"\n"}
                  </p>
                </div>
              )}
            </div>                     
          </div>
          <div className="docking-and-button">
            <div className="molstar">
              <Molstar {...molstar_props}/>      
            </div>
            <div className="affinity">
              Affinity score:{" "} 
              {this.props.saved_mols[this.props.selected_mol].data.drug_props.docking_affinity} kcal/mol
              <div className="nav-buttons">
                <Link to="/build">
                  <button>
                    ← Design 
                  </button>
                </Link>
                <Link to="/assay">
                  <button
                    onClick={this.initPlotData}   // When clicking on Analysis, it initializes the plot data
                  >
                    Test →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div> ) : (
          <div className='unsavedmol'>       
          <Link to="/Loadingpage">
            <button className="mk_pre_test_button">Go back to design your molecules first!</button>
          </Link></div>
        )
      }
      </div>
    );
  }
}

// This function maps parts of the Redux state to this component's props
function mapStateToProps(state) {
  return {
    help: state.init.help.build,
    selected_mol: state.selector.selected_mol,     // The currently selected molecule from the selector part of the state
    saved_mols: state.assay.saved_mols,            // The saved molecules from the assay part of the state
    saved_or_not: state.assay.saved_or_not,
  };
}

// Define the action creators used in this component
const actionCreators = {
  constructPlotObj: analysisActions.constructPlotObj, // The action to construct the plot object
};

// Connect the Docking component to the Redux store and export it
export default connect(mapStateToProps, actionCreators)(Docking);

