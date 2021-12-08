import React from 'react';
import { MoleculeImage } from './app';
import "./assay.css";


class AssayPanel extends React.Component {
    render() {
        return (
            <div className='assay-panel'>
                <Assay_Buttons label="pIC50" />
                <Assay_Buttons label="Clearance Mouse" />
                <Assay_Buttons label="Clearance Human" />
                <Assay_Buttons label="LogD" />
                <Assay_Buttons label="PAMPA" />
                <Assay_Buttons label="Run filters" />
                <Assay_Buttons label="Calculate Descriptors" />
            </div>
        )
    }
}


{/* <div className="assay_button_bar">
                 <button label="pIC50" onClick={() => this.setState({pIC50:'Yes'})}/>
                 <button label="Clearance Mouse" onClick={() =>this.setState({c_mouse:'Yes'})}/>
                 <button label="Clearance Human" onClick={() =>this.setState({c_human:'Yes'})}/>
                 <button label="LogD" onClick={() =>this.setState({logD:'Yes'})}/>
                 <button label="PAMPA" onClick={() =>this.setState({PAMPA:'Yes'})}/>
                 <button label="Run filters"/>
                 <button label="Calculate Descriptors"/>
                 <button label="Run Assays" onClick={()=> this.triggerAllAssay()}/> */}


class Assay_Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
        }
    }
    runAssay = () => {
        console.log(this.state.label)
    }
    render() {
        return (
            <div className="button-box">
                <button className="assay_button" onClick={this.runAssay}>
                    {this.state.label}
                </button>
            </div>
        )
    }
}

class MoleculeWidget extends React.Component {

    sendMolecule = (r_groups) => {
        this.props.selectMoleculeCallback(r_groups)
    }

    imageClick = () => {
        this.sendMolecule(this.props.r_groups)
    }

    render() {
        return (
            <div className='molecule-container'>
                <div className="molecule-widget" onClick={this.imageClick} >
                    <MoleculeImage key={this.props.key} r_groups={this.props.r_groups} />
                </div>
            </div>
        )
    }
}


class MoleculeList extends React.Component {
    render() {
        return (
            <div className='molecule-list' >
                {Array.from({ length: this.props.saved_mol_list.length }, (_, i) =>
                    <MoleculeWidget key={this.props.saved_mol_list[i]} r_groups={this.props.saved_mol_list[i]} selectMoleculeCallback={this.props.selectMoleculeCallback} />)}
            </div>
        );
    }
}

class Assay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            selected_mol: ['A01', 'B01'],
            assay_dict: { pIC50: 'No', c_mouse: 'No', c_human: 'No', LogD: 'No', PAMPA: 'No' }
        };
        this.triggerAllAssay = this.triggerAllAssay.bind(this);
        this.getSavedMolecules();
    }

    triggerAllAssay() {
        const base_url = 'http://127.0.0.1:5000/assays?pIC50='
        fetch(base_url +
            this.state.pIC50 +
            '&c_mouse=' + this.state.c_mouse +
            '&c_human=' + this.state.c_human +
            '&LogD=' + this.state.LogD +
            '&PAMPA=' + this.state.PAMPA
            , { method: "POST" });
        this.setState({ pIC50: 'No', c_mouse: 'No', c_human: 'No', LogD: 'No', PAMPA: 'No' })
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

    setSelectedMoleculeCallback = (r_group_ids) => {
        this.setState({ selected_mol: r_group_ids }, () => {
            console.log(this.state.selected_mol);
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="assay">
                    <div className="molecule-chooser_bar">
                        <MoleculeList saved_mol_list={this.state.list} selectMoleculeCallback={this.setSelectedMoleculeCallback} />
                    </div>
                    {/* <div className="assay_button_bar"> */}
                    <div className="assay-panel">
                        {/* <AssayPanel /> */}
                        <div className="assay_button_bar">
                            <button label="pIC50" onClick={() => this.setState({ pIC50: 'Yes' })}>pIC50</button>
                            <button label="Clearance Mouse" onClick={() => this.setState({ c_mouse: 'Yes' })}>Clearance Mouse</button>
                            <button label="Clearance Human" onClick={() => this.setState({ c_human: 'Yes' })}>Clearance Human</button>
                            <button label="LogD" onClick={() => this.setState({ logD: 'Yes' })}>LogD</button>
                            <button label="PAMPA" onClick={() => this.setState({ PAMPA: 'Yes' })}>PAMPA</button>
                            <button label="Run filters" >Run filters</button>
                            <button label="Calculate Descriptors" >Calculate Descriptors</button>
                            <button label="Run Assays" onClick={() => this.triggerAllAssay()}>Run Assays</button>

                        </div>
                    </div>
                        <div className="display_molecule_bar">
                            <MoleculeImage key={this.state.selected_mol} r_groups={this.state.selected_mol} />
                            {this.state.pIC50}
                            {this.state.c_mouse}
                            {this.state.c_human}
                            {this.state.LogD}
                            {this.state.PAMPA}
                        </div>

                    </div>
            </div>
        )
    }
}

export default Assay;