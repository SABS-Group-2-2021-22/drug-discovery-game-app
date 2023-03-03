import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";
import React from "react";

import './logo_banner.css'

class LogoBanner extends React.Component{
    constructor(props) {
        super(props);
      }

      render() {
        return (
            <div className="button-and-logo-area">
            {" "}
            <div className="logos-area">
            <div className="logo-img-text">
                {""} 
                <img src={sabs} />{""}
                <div class="logo-text">
                <span>EPSRC SABS R³ CDT: Sustainable Approaches to Biomedical Science Responsible & Reproducible Research</span>
            </div>
            </div>
            
            <div className="logo-img-text" >
                {" "}
                <img src={epsrc} />{" "}
            </div>
            <div className="logo-img-text">
                {" "}
                <img src={oxuni} />{""}
                <div class="logo-text">
                <span>University of Oxford</span>
            </div>
            </div>
            </div>
            </div>
        )
      }
    }

export default (LogoBanner);