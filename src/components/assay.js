import React from 'react';
import "./assay.css";

class Assay_Buttons extends React.Component {
    render () {
        return(
        <button className="assay_button">
            {this.props.label}
        </button>
        )

    }
}
class Assay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pIC50:'No', c_mouse:'No', c_human:'No', LogD:'No', PAMPA:'No' };
        this.triggerAllAssay = this.triggerAllAssay.bind(this);
    }

    triggerAllAssay() {
        const base_url = 'http://127.0.0.1:5000/assays?pIC50='
        fetch(base_url+this.state.pIC50+'&c_mouse='+this.state.c_mouse+'&c_human='+this.state.c_human+'&LogD='+this.state.LogD+'&PAMPA='+this.state.PAMPA, {method: "POST"});
        this.setState({pIC50:'No', c_mouse:'No', c_human:'No', LogD:'No', PAMPA:'No'})
    }
    render() {
        return (
        <div className="assay">
            <div className="molecule-chooser_bar">
                 Saved molecules
            </div>
            <div className="assay_button_bar">
                 <button label="pIC50" onClick={() => this.setState({pIC50:'Yes'})}/>
                 <button label="Clearance Mouse" onClick={() =>this.setState({c_mouse:'Yes'})}/>
                 <button label="Clearance Human" onClick={() =>this.setState({c_human:'Yes'})}/>
                 <button label="LogD" onClick={() =>this.setState({logD:'Yes'})}/>
                 <button label="PAMPA" onClick={() =>this.setState({PAMPA:'Yes'})}/>
                 <button label="Run filters"/>
                 <button label="Calculate Descriptors"/>
                 <button label="Run Assays" onClick={()=> this.triggerAllAssay()}/>

            </div>
            <div className="display_molecule_bar">
                    {this.state.pIC50}
                    {this.state.c_mouse}
                    {this.state.c_human}
                    {this.state.LogD}
                    {this.state.PAMPA}
            </div>
            
        </div>
        )
    }
}

export default Assay;