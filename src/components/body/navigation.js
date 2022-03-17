import React from "react";
import { NavLink } from "react-router-dom";

import "./navigation.css";

function Navigation() {
    return (
        <div className="navigation">
          <div className="container">
            <NavLink className="navigation-brand" to="/">
              Drug Discovery Game
            </NavLink>
            <div>
              <ul className="navigation-bar">
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/">
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
                    Build
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink className="navigation-link" to="/assay">
                    Assay
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
    );
}

export default Navigation