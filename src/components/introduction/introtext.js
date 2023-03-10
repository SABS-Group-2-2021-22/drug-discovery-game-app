import React from "react";
import "./introduction.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class IntroText extends React.Component {
  constructor(props) {
    super(props);
  }

render()
{
    return(
        <div>
        {this.props.id === 0 &&
        <div className="introtext">
        <p>Matrix metalloproteinase 12 (MMP-12) is an enzyme implicated in emphysema and asthma. It has been identified as a possible drug target.
        {"\n"}  {"\n"}  MMP-12 is made by immune cells in the lungs, and it is thought that it can cause damage and inflammation in the lungs.
        {"\n"}  {"\n"} You are going to try to design a compound with desired properties that inhibits MMP-12 in the body (including the lungs).
      </p>
      </div>}
        
        {this.props.id === 1 &&
        <div className="introtext">
        <p>The optimal properties of a certain drug depend on the specific condition you are trying to treat.
        {"\n"}  {"\n"}
        The target compound profile or TCP (in terms of desired properties) for MMP-12 is indicated below:
        {"\n"}  - Good lipophilicity (i.e. LogD ≥ 1 at neutral pH),
        {"\n"}  - Medium to high permeability (PAMPA),
        {"\n"}  -  Good metabolic stability (low clearance) in mouse and human, and
        {"\n"}  -  High potency (i.e. pIC<sub>50</sub> ≥ 6).
      </p>
      </div>}

        {this.props.id === 2 &&
        <div className="introtext">
         <p>There are 4 stages in the drug discovery process, namely:
         {"\n"}1. <b>Design</b> and <b>make</b> potential lead compounds.
         {"\n"}2. <b>Test</b>: Perform assays (experiments) and run calculations to determine the properties 
         of the molecules you have designed. With this additional information, you can then go
          back and develop improved compounds.
         {"\n"}3. <b>Analyse</b>: Compare the properties of the different molecules you have designed.
         {"\n"}4. Find out how your drug compares to the optimal molecule for targeting MMP12.

         {/* {"\n"}  {"\n"}You start the game with £100,000 and 30 weeks, running experiments will reduce both of these. 
         The game ends when you run out of budget, time or if you are happy with the molecule you have made and decide to end the game. */}
       </p>
       </div>} 

       {this.props.id === 3 &&
        <div className="introtext">
         <p>
         You start the game with £100,000 and 30 weeks, running experiments will reduce both of these. 
         The game ends when you run out of budget, time or if you are happy with the molecule you have made and decide to end the game.
         In the following page you are given a base scaffold with which you can start designing your molecule by adding R-groups (R1 and R2).
       </p>
       </div>} 

        </div>
    );
}

}

export default (IntroText);
