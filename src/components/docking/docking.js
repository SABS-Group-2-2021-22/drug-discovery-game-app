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
    let file = {filestring:"./1e7i.pdb", type:"pdb"}
    // https://files.rcsb.org/view/
    // let url = "http://localhost:5000/docking"
    let url = "http://localhost:5000/docking-6lu7.pdb"
    console.log(file.filestring)
    return (
      <div className="wrapper">
        <div className="docking-elements">
          <div className="final-molecule-bar">
            <MoleculeList />
          </div>
          <div className="docking-and-button">
            <div className="molstar">
              <Molstar url={url}/>
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
