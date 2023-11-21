import React from "react";
import "./introduction.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DDProcessImage from '../../assets/DD_process.png'; 

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
        <p>Matrix metalloproteinase 12 (<a href="https://en.wikipedia.org/wiki/Matrix_metallopeptidase_12" target="_blank">MMP-12</a>) is an enzyme implicated in emphysema and asthma. It has been identified as a possible drug target.
        {"\n"}  {"\n"}  MMP-12 is made by immune cells in the lungs, and it is thought that it can cause damage and inflammation in the lungs.
        {"\n"}  {"\n"} You are going to try to design a compound with desired properties that inhibits MMP-12 in the body (including the lungs).
      </p>
      </div>}
        
        {this.props.id === 1 &&
        <div className="introtext">
        <p>The optimal properties of a certain drug depend on the specific condition you are trying to treat.
        {"\n"}  {"\n"}
        The target compound profile or TCP (in terms of desired properties) for MMP-12 is indicated below:
        {"\n"}  - Good lipophilicity (i.e. <a href="https://en.wikipedia.org/wiki/Partition_coefficient#:~:text=The%20distribution%20coefficient%2C%20log%20D%2C%20is%20the%20ratio,log%20P%20for%20non-ionizable%20compounds%20at%20any%20pH" target="_blank">LogD</a> ≥ 1 at neutral pH),
        {"\n"}  - Medium to high permeability (<a href="https://en.wikipedia.org/wiki/Parallel_artificial_membrane_permeability_assay#:~:text=In%20medicinal%20chemistry%2C%20parallel%20artificial%20membrane%20permeability%20assay,-infused%20artificial%20membrane%20into%20an%20acceptor%20compartment.%20" target="_blank">PAMPA</a>),
        {"\n"}  -  Good metabolic stability (low <a href="https://en.wikipedia.org/wiki/Clearance_(pharmacology)" target="_blank">clearance</a>) in mouse and human, and
        {"\n"}  -  High potency (i.e. <a href="https://www.collaborativedrug.com/cdd-blog/what-is-pic50-2#:~:text=Simply%20stated%2C%20pIC50%20is%20the,is%20a%20pIC50%20of%209" target="_blank">pIC<sub>50</sub></a> ≥ 6).
      </p>
      </div>}

        {this.props.id === 2 &&
        <div className="introtext">
         <p>There are 4 stages in the drug discovery process, namely:
         {"\n"}1. <b>Design</b> and <b>make</b> potential lead compounds. Compound design can be guided 
         by observation of <a href="https://en.wikipedia.org/wiki/Lipinski%27s_rule_of_five#cite_note-Lipinski_2001-1" target="_blank">Lipinski's rule of five</a> as well as other metrics for quantifying desirable <a href="https://en.wikipedia.org/wiki/ADME" target="_blank">ADMET</a> properties such as <a href="https://en.wikipedia.org/wiki/Polar_surface_area" target="_blank">TPSA</a> and <a href="https://en.wikipedia.org/wiki/Partition_coefficient#Partition_coefficient_and_log_P" target="_blank">LogP</a>.
         {"\n"}2. <b>Test</b>: Perform assays (experiments) and run calculations to determine the properties 
         of the molecules you have designed. With this additional information, you can then go
          back and develop improved compounds.
         {"\n"}3. <b>Analyse</b>: Compare the properties of the different molecules you have designed.
         {"\n"}4. Find out how your drug compares to the optimal molecule for targeting MMP-12.

         {/* {"\n"}  {"\n"}You start the game with £100,000 and 30 weeks, running experiments will reduce both of these. 
         The game ends when you run out of budget, time or if you are happy with the molecule you have made and decide to end the game. */}
       </p>
       </div>} 

       {/* Button to view DD process  */}
       {this.props.id === 2 &&
              < div className="view-picture-button">
                <a href={DDProcessImage} target="_blank" rel="noopener noreferrer"> 
                  <button> View Drug Discovery process</button>
                </a>
              </div>
       }

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
