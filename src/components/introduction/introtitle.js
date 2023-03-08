import React from "react";
import "./introduction.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class IntroTitle extends React.Component {
  constructor(props) {
    super(props);
  }

render()
{
    return(
        <div>
        {this.props.id === 0 &&
        <div className="introductiontitle">
        What are we designing the drug for?
      </div>}
        
        {this.props.id === 1 &&
        <div className="introductiontitle">
        The optimal properties for the candidate drug
      </div>}

        {this.props.id === 2 &&
        <div className="introductiontitle">
         The drug discovery Process
       </div>} 

       {this.props.id === 3 &&
        <div className="introductiontitle">
       The objective of the game
       </div>} 

        </div>
    );
}

}

export default (IntroTitle);
