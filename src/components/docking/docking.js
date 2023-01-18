import React from "react";
import "./docking.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { initActions, selectorActions, gameActions } from "../../actions";
import MoleculeList from "../assay/molecule_list.js";

class Docking extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="docking">
          <div className="final-molecule-bar">
            <MoleculeList />
          </div>
          <div className="dockingtitle">Docking Viewer</div>
          <div className="control-panel">
            <div className="analysis-button">
              <Link to="/analysis">
                <button>Analysis</button>
              </Link>
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
