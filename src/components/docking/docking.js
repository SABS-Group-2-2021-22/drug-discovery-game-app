import React from "react";
import "./docking.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import MoleculeList from "../analysis/molecule_list.js";
import Molstar from "molstar-react";

class Docking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_controls: false,
    };
  }

  render() {
    console.log(this.props.selected_mol)
    let url = `http://localhost:5000/docking-${this.props.selected_mol}dock1.pdb`
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
              Affinity score: -8.0

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
  };
}

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Docking);
