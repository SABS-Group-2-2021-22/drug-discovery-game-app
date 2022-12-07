import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";

class Introduction2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="introduction">
          <div className="introductiontitle">What should the drug be like? </div>
          <div className="pic-and-text">
            <div className="text-and-button">
              <div className="text">
                <p>The optimal properties of a certain drug depend on the specific condition you are trying to treat.
                  {"\n"}  {"\n"}
                  The target compound profile or TCP (in terms of desired properties) for MMP-12 is indicated below:
                  {"\n"}  - Good lipophilicity (i.e. logD ≥ 1 at neutral pH),
                  {"\n"}  - Medium to high permeability (PAMPA),
                  {"\n"}  -  Good metabolic stability (low clearance) in mouse and human, and
                  {"\n"}  -  High potency (i.e. pIC50 ≥ 6).
                </p>
              </div>
              <div className="control-panel">
                <Link to="/introduction">
                  <button>Back</button>
                </Link>
                <Link to="/introduction3">
                  <button>Next</button>
                </Link>
                <Link to="/build">
                  <button>Skip Introduction</button>
                </Link>
              </div>
            </div>
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
              <div className="text">MMP-12</div>
            </div>
          </div>

          <div className="button-and-logo-area">
            {" "}
            {/*actually no longer conatins the start button */}
            <div className="logos-area">
              <div className="logo">
                {" "}
                <img src={sabs} height="120px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={epsrc} height="100px" />{" "}
              </div>
              <div className="logo">
                {" "}
                <img src={oxuni} height="100px" />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (Introduction2);
