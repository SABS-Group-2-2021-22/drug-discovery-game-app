import React from "react";
import "./introduction.css";

class IntroTitle extends React.Component {
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
         The drug discovery process
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
