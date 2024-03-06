import React from "react";
import "./introduction.css";


class IntroTitle extends React.Component {

render()
{
    return(
        <div>
        {this.props.id === 1 &&
        <div className="introductiontitle">
        What are we designing the drug for?
      </div>}
        
        {this.props.id === 2 &&
        <div className="introductiontitle">
        MMP-12 Inhibitor Target Compound Profile
      </div>}

        {this.props.id === 0 &&
        <div className="introductiontitle">
         The Drug Discovery Process
       </div>} 

       {this.props.id === 3 &&
        <div className="introductiontitle">
       The Game Objective
       </div>} 

        </div>
    );
}

}

export default (IntroTitle);