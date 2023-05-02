import sabs from "../../assets/sabs-logo-tight.png";
import oxuni from "../../assets/oxlogo-sq-border.png";
import epsrc from "../../assets/EPSRC_logo.png";
import React from "react";

import './logo_banner.css'

class LogoBanner extends React.Component{
      render() {
        return (
            <div className="button-and-logo-area">
            {" "}
            <div className="logos-area">
            <div className="logo-img-text">
                {""} 
                <img alt='' src={sabs} />{""}
                <div className="logo-text">
                <span>EPSRC SABS R³ CDT: Sustainable Approaches to Biomedical Science Responsible & Reproducible Research</span>
            </div>
            </div>
            
            <div className="logo-img-text" >
                {" "}
                <img alt='' src={epsrc} />{" "}
            </div>
            <div className="logo-img-text">
                {" "}
                <img alt='' src={oxuni} />{""}
                <div className="logo-text">
                <span>University of Oxford</span>
            </div>
            </div>
            </div>
            </div>
        )
      }
    }

export default (LogoBanner);