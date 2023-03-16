import React from "react";
import "./docking.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions, analysisActions } from "../../actions";
import MoleculeList from "../analysis/molecule_list.js";
import Molstar from "molstar-react";

class Docking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_controls: false,
    };
  }

  initPlotData = () => {
    // creates object for plotting - firing it here just speeds 
    // ...things up a bit
    this.props.constructPlotObj(this.props.saved_mols);
  };

  render() {
    let url = `http://localhost:5000/docking-${this.props.selected_mol}dock1_concatenated.pdb`

    let molstar_props = {
      url:url,
      showControls:true,
      useInterface:true,
    }
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
                    onClick={this.initPlotData}
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

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    saved_mols: state.assay.saved_mols,
  };
}

const actionCreators = {
  constructPlotObj: analysisActions.constructPlotObj,
};

export default connect(mapStateToProps, actionCreators)(Docking);
