import React from "react";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";
import { NavLink } from "react-router-dom";

import "./navigation.css";

class Navigation extends React.Component {
  // set the first saved molecule as the selected molecule for assay and docking pages
  initSelectMolecule = () => {
    const keys = Object.keys(this.props.saved_mols);
    if (keys.length > 0) {
      // Assuming you want to select the first molecule if there are any
      this.props.selectMolecule(keys[0]);
    }
  };

  render() {
    return(
        <div className="navigation">
          <div className="container">
            <NavLink className="navigation-brand" to="/">
              Drug Discovery Game
            </NavLink>
            <div>
              <ul className="navigation-bar">
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/introduction">
                    Introduction
                  </NavLink>
                  
                </li>
           
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/build">
                    Design
                  </NavLink>
                  
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/docking" onClick={this.initSelectMolecule}>
                    Docking
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/assay" onClick={this.initSelectMolecule}>
                    Test
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/analysis" onClick={this.initSelectMolecule}>
                    Analysis
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/results" onClick={this.initSelectMolecule}>
                    Results
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
      </div>
  )};
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(Navigation);