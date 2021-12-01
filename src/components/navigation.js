import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    return (
        <div className="navigation">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              React Multi-Page Website
            </NavLink>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/app">
                    App
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/assay">
                    Assay
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/analysis">
                    Analysis
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/results">
                    Results
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Navigation