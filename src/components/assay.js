import React from 'react';
import "./assay.css";

class Assay_Buttons extends React.Component {
    render () {
        return(
        <div className="assay_button">
            {this.props.label}
        </div>
        )

    }
}
class Assay extends React.Component {
    render() {
        return (
        <div className="assay">
            <div className="molecule-chooser_bar">
                 Saved molecules
            </div>
            <div className="assay_button_bar">
                 <Assay_Buttons label="pIC50"/>
                 <Assay_Buttons label="Clearance Mouse"/>
                 <Assay_Buttons label="Clearance Human"/>
                 <Assay_Buttons label="LogD"/>
                 <Assay_Buttons label="PAMPA"/>
                 <Assay_Buttons label="Run filters"/>
                 <Assay_Buttons label="Calculate Descriptors"/>

            </div>
            <div className="display_molecule_bar">
                 Selected molecule
                 + assay values 
                 + descriptor values
                 + filter pass/fail
            </div>
            
        </div>
        )
    }
}

export default Assay;