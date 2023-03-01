import React from "react";
// import "./assay.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import Lipinski from "./lipinski_display.js";
// import Descriptors from "./descriptor_display.js";
// import Assays from "./assay_display.js";

class IntroText extends React.Component {
  constructor(props) {
    super(props);
  }

render()
{
    return(
        <div>
        {this.props.id === 0 &&
        <p>Matrix metalloproteinase 12 (MMP-12) is an enzyme implicated in emphysema and asthma. It has been identified as a possible drug target.
        {"\n"}  {"\n"}  MMP-12 is made by immune cells in the lungs, and it is thought that it can cause damage and inflammation in the lungs.
        {"\n"}  {"\n"} You are going to try to design a compound with desired properties that inhibits MMP-12 in the body (including the lungs).
      </p>}
        
        {this.props.id === 1 &&
        <p>The optimal properties of a certain drug depend on the specific condition you are trying to treat.
        {"\n"}  {"\n"}
        The target compound profile or TCP (in terms of desired properties) for MMP-12 is indicated below:
        {"\n"}  - Good lipophilicity (i.e. logD ≥ 1 at neutral pH),
        {"\n"}  - Medium to high permeability (PAMPA),
        {"\n"}  -  Good metabolic stability (low clearance) in mouse and human, and
        {"\n"}  -  High potency (i.e. pIC50 ≥ 6).
      </p>}

        {this.props.id === 2 &&
         <p>There are 4 stages.
         {"\n"}1. Design potential lead compounds.
         {"\n"}2. Perform assays (experiments) and run calculations to determine the properties 
         of the molecules you have designed. With this additional information, you can then go
          back and develop improved compounds.
         {"\n"}3. Compare the properties of the different molecules you have designed.
         {"\n"}4. Find out how your drug compares to the optimal molecule for targeting MMP12.

         {"\n"}  {"\n"}You start the game with £100,000 and 30 weeks, running experiments will reduce both of these. 
         The game ends when you run out of budget, time or if you are happy with the molecule you have made and decide to end the game.

       </p>}


       {/* {this.props.id === 3 &&
         <Link to="/loadingpage">
         <button>Skip Introduction</button>
       </Link>
         } */}

        
        </div>
    );
}

}

export default (IntroText);
