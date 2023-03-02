import React from "react";
import "./introduction.css";
import { Link } from "react-router-dom";
import pymolpic from "../../assets/pymolMMP12.png";
import { connect } from "react-redux";
import { initActions, selectorActions } from "../../actions";
import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";
import { LogoBanner } from "../body";

class Introduction3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="introduction">
          <div className="introductiontitle">How will I design this drug? </div>
          <div className="pic-and-text">
            <div className="text-and-button">
              <div className="text">
                <p>There are 4 stages.
                  {"\n"}1. Design potential lead compounds.
                  {"\n"}2. Perform assays (experiments) and run calculations to determine the properties 
                  of the molecules you have designed. With this additional information, you can then go
                   back and develop improved compounds.
                  {"\n"}3. Compare the properties of the different molecules you have designed.
                  {"\n"}4. Find out how your drug compares to the optimal molecule for targeting MMP12.

                  {"\n"}  {"\n"}You start the game with £100,000 and 30 weeks, running experiments will reduce both of these. 
                  The game ends when you run out of budget, time or if you are happy with the molecule you have made and decide to end the game.
      
                </p>
              </div>
              <div className="control-panel">
                <Link to="/introduction2">
                  <button>Back</button>
                </Link>
                <Link to="/loadingpage">
                  <button>Next</button>
                </Link>
              </div>
            </div>
            <div className="picture">
              {" "}
              <img src={pymolpic} />{" "}
              <div className="text">MMP-12</div>
            </div>
          </div>
          <LogoBanner/>
        </div>
      </div>
    );
  }
}

export default (Introduction3);
