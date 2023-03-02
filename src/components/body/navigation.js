import React from "react";
import { NavLink } from "react-router-dom";

import "./navigation.css";

// const { pathname } = useLocation();

class Navigation extends React.Component {
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
                  <NavLink className="navigation-link" to="/assay">
                    Test
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/analysis">
                    Analysis
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/results">
                    Results
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
      </div>
  )};
}

export default Navigation