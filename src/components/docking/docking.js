import React from "react";
import "./docking.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import MoleculeList from "../assay/molecule_list.js";
import Molstar from "molstar-react";

class Docking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = "http://localhost:5000/docking-6lu7.pdb"
    let molstar_props = {
      url:url,
      //showControls:true,
      useInterface:true
    }
    return (
      <div className="wrapper">
        <div className="docking-elements">
          <div className="final-molecule-bar">
            <MoleculeList />
          </div>
          <div className="docking-and-button">
            <div className="molstar">
              <Molstar {...molstar_props}/>
            </div>
            <div className="affinity">
              Affinity score: -8.0
              <div className="control-panel">
                <div className="analysis-button">
                  <Link to="/analysis">
                    <button>Analysis</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(Docking);
