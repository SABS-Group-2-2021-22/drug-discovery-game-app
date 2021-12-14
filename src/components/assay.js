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
    constructor(props) {
        super(props);
        const r_group_string = this.props.r_groups[0] + this.props.r_groups[1]

        this.state = {
            assays_have_run: (r_group_string in this.props.assay_dict),
            assay_dict: (r_group_string in this.props.assay_dict) ? this.props.assay_dict[r_group_string] : {},
        }
    }

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
                    {(this.props.r_groups[0] + this.props.r_groups[1]) in this.props.assay_dict
                        &&
                        <MoleculeStats
                            key={this.props.key}
                            assay_stats={this.props.assay_dict[this.props.r_groups[0] + this.props.r_groups[1]]}
                        />}
                </div>
            </div>
        )
    }
}



class MoleculeStats extends React.Component {
    render() {
        return (
            <div class="container" className="assay-stats">
                <div class="row">
                    pIC50: {Number(this.props.assay_stats.pic50).toFixed(1)}
                </div>
                <div class="row">
                    Clearance Mouse: {this.props.assay_stats.clearance_mouse}
                </div>
                <div class="row">
                    Clearance Human: {this.props.assay_stats.clearance_human}
                </div>
                <div class="row">
                    LogD: {this.props.assay_stats.logd}
                </div>
                <div class="row">
                    PAMPA: {this.props.assay_stats.pampa}
                </div>
                <div class="row">
                    Filters: FILTER VAL
                </div>
                <div class="row"> Descr.: DESCR.
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
                    <MoleculeWidget
                        key={this.props.saved_mol_list[i]}
                        r_groups={this.props.saved_mol_list[i]}
                        assays_have_run={this.props.assays_have_run}
                        assay_dict={this.props.assay_dict}
                        selectMoleculeCallback={this.props.selectMoleculeCallback}
                    />)}
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
            assay_dict: { pIC50: 'No', c_mouse: 'No', c_human: 'No', LogD: 'No', PAMPA: 'No' },
            assay_results: {},
            assays_have_run: false,
        };
        this.getSavedMolecules();
        this.triggerAllAssay();
    }

    triggerAllAssay = () => {
        const base_url = 'http://127.0.0.1:5000/assays?' +
            'r1=' + this.state.selected_mol[0] +
            '&r2=' + this.state.selected_mol[1] +
            '&pic50=' + this.state.assay_dict.pIC50 +
            '&clearance_mouse=' + this.state.assay_dict.c_mouse +
            '&clearance_human=' + this.state.assay_dict.c_human +
            '&logd=' + this.state.assay_dict.LogD +
            '&pampa=' + this.state.assay_dict.PAMPA
        fetch(base_url)
            .then((response) => response.json())
            .then(response => {
                this.setState({ assay_results: response.assay_dict }, () => {
                    console.log(this.state.assay_results);
                })
                this.setState({ assays_have_run: true })
            })
            .catch(err => {
                throw Error(err.message);
            });
        this.resetSelection()
    }

    resetSelection = () => {
        this.setState({
            assay_dict: {
                pIC50: 'No',
                c_mouse: 'No',
                c_human: 'No',
                LogD: 'No',
                PAMPA: 'No'
            }
        })
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
                        <MoleculeList saved_mol_list={this.state.list} assays_have_run={this.state.assays_have_run} assay_dict={this.state.assay_results} selectMoleculeCallback={this.setSelectedMoleculeCallback} />
                    </div>
                    <div className="assay-panel">
                        <button label="pIC50" onClick={() => this.setState({ assay_dict: { ...this.state.assay_dict, pIC50: 'Yes' } })}>pIC50</button>
                        <button label="Clearance Mouse" onClick={() => this.setState({ assay_dict: { ...this.state.assay_dict, c_mouse: 'Yes' } })}>Clearance Mouse</button>
                        <button label="Clearance Human" onClick={() => this.setState({ assay_dict: { ...this.state.assay_dict, c_human: 'Yes' } })}>Clearance Human</button>
                        <button label="LogD" onClick={() => this.setState({ assay_dict: { ...this.state.assay_dict, LogD: 'Yes' } })}>LogD</button>
                        <button label="PAMPA" onClick={() => this.setState({ assay_dict: { ...this.state.assay_dict, PAMPA: 'Yes' } })}>PAMPA</button>
                        <button label="Run filters" >Run filters</button>
                        <button label="Calculate Descriptors" >Calculate Descriptors</button>
                        <button label="Run Assays" onClick={this.triggerAllAssay}>Run Assays</button>

                    </div>
                    <div className="display_molecule_bar">
                        <MoleculeImage key={this.state.selected_mol} r_groups={this.state.selected_mol} />
                        <div className='selected-mol-stats'>
                            {(this.state.selected_mol[0] + this.state.selected_mol[1]) in this.state.assay_results
                                && <MoleculeStats
                                    key={this.state.selected_mol}
                                    assay_stats={this.state.assay_results[this.state.selected_mol[0] + this.state.selected_mol[1]]}
                                />}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Assay;