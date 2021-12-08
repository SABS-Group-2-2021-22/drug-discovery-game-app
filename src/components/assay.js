import React from 'react';
import {MoleculeImage} from './app';
import "./assay.css";

class Assay_Buttons extends React.Component {
    render() {
        return (
            <div className="assay_button">
                {this.props.label}
            </div>
        )

    }
}

class MoleculeWidget extends React.Component {
    render() {
      return (
          <div className='molecule-container'> 
        <div className="molecule-widget">
            <MoleculeImage key={this.props.key} r_groups={this.props.r_groups} />
        </div>
        </div>
      )
    }
}


class MoleculeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
        this.getSavedMolecules();
    }

    getSavedMolecules = () => {
        const url = 'http://127.0.0.1:5000/savedmolecules'
        fetch(url)
            .then((response) => response.json())
            .then(molecule_list => {
                this.setState({ list: molecule_list.saved_mols }, () => {
                    console.log(this.state.list);
                })
            })
            .catch(err => {
                throw Error(err.message);
            });
    }

    render() {
        return (
            <div className='molecule-list' >
                {Array.from({ length: this.state.list.length }, (_, i) =>
                    <MoleculeWidget key={this.state.list[i]} r_groups={this.state.list[i]} />)}
            </div>
        );
    }
}


class Assay extends React.Component {
    render() {
        return (
            <div className="wrapper">
            <div className="assay">
                <div className="molecule-chooser_bar">
                    <MoleculeList />
                </div>
                <div className="assay_button_bar">
                    <Assay_Buttons label="pIC50" />
                    <Assay_Buttons label="Clearance Mouse" />
                    <Assay_Buttons label="Clearance Human" />
                    <Assay_Buttons label="LogD" />
                    <Assay_Buttons label="PAMPA" />
                    <Assay_Buttons label="Run filters" />
                    <Assay_Buttons label="Calculate Descriptors" />

                </div>
                <div className="display_molecule_bar">
                    Selected molecule
                    + assay values
                    + descriptor values
                    + filter pass/fail
                </div>

            </div>
            </div>
        )
    }
}

export default Assay;