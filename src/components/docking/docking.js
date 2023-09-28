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
        <div className="docking-elements">
          <div className="mol-list">
            <MoleculeList />                      
          </div>
          <div className="docking-and-button">
            <div className="molstar">
              <Molstar {...molstar_props}/>      
            </div>
            <div className="affinity">
              Affinity score:{" "} 
              {this.props.saved_mols[this.props.selected_mol].data.drug_props.docking_affinity} kcal/mol
              <div className="nav-buttons">

                <Link to="/assay">
                  <button>
                    ← Test 
                  </button>
                </Link>
                <Link to="/analysis">
                  <button
                    onClick={this.initPlotData}   // When clicking on Analysis, it initializes the plot data
                  >
                    Analysis →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// This function maps parts of the Redux state to this component's props
function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,     // The currently selected molecule from the selector part of the state
    saved_mols: state.assay.saved_mols,            // The saved molecules from the assay part of the state
  };
}

// Define the action creators used in this component
const actionCreators = {
  constructPlotObj: analysisActions.constructPlotObj, // The action to construct the plot object
};

// Connect the Docking component to the Redux store and export it
export default connect(mapStateToProps, actionCreators)(Docking);
