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
                    <MoleculeImage key={this.props.key} r_groups={this.props.r_groups} 
                        size={"800,800"} />
                    {this.props.molecule_stats !== undefined
                        &&
                        <MoleculeStats
                            key={this.props.key}
                            molecule_stats={this.props.molecule_stats}
                        />}
                </div>
            </div>
        )
    }
}



class MoleculeStats extends React.Component {
    render() {
        return (
            <div className="mol-stats">
                {this.props.molecule_stats.hasOwnProperty('assays') && <Assays molecule_stats={this.props.molecule_stats} />}
                {this.props.molecule_stats.hasOwnProperty('lipinski') && <Filters molecule_stats={this.props.molecule_stats} />}
                {this.props.molecule_stats.hasOwnProperty('descriptors') && <Descriptors molecule_stats={this.props.molecule_stats} />}
            </div >
        )
    }
}

class Assays extends React.Component {
    render() {
        return (
            <div class="container" className="assay-stats">
                <div class="row" className="stats-type-header"> Assay Data: </div>
                <div class="row">
                    pIC50: {Number(this.props.molecule_stats.assays.pic50).toFixed(1)}
                </div>
                <div class="row">
                    Clearance Mouse: {this.props.molecule_stats.assays.clearance_mouse}
                </div>
                <div class="row">
                    Clearance Human: {this.props.molecule_stats.assays.clearance_human}
                </div>
                <div class="row">
                    LogD: {this.props.molecule_stats.assays.logd}
                </div>
                <div class="row">
                    PAMPA: {this.props.molecule_stats.assays.pampa}
                </div>
            </div>
        )
    }
}
class Filters extends React.Component {
    render() {
        return (
            <div class="container" className="filter-stats">
                <div class="row" className="stats-type-header"> Lipinski Filters: </div>
                <div class="row">
                    MW: {this.props.molecule_stats.lipinski.MW ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    H Acc.: {this.props.molecule_stats.lipinski.h_acc ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    H Don.:{this.props.molecule_stats.lipinski.h_don ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    logP: {this.props.molecule_stats.lipinski.logP ? 'Pass' : 'Fail'}
                </div>
            </div>
        )
    }
}

class Descriptors extends React.Component {
    render() {
        return (
            <div class="container" className="descriptor-stats">
                <div class="row" className="stats-type-header"> Molecule Descriptors: </div>
                <div class="row">
                    HA: {this.props.molecule_stats.descriptors.HA}
                </div>
                <div class="row">
                    MW: {Number(this.props.molecule_stats.descriptors.MW).toFixed(1)} Da
                </div>
                <div class="row">
                    TPSA:{Number(this.props.molecule_stats.descriptors.TPSA).toFixed(1)} {"Å\u00b2"}
                </div>
                <div class="row">
                    H Acc.: {this.props.molecule_stats.descriptors.h_acc}
                </div>
                <div class="row">
                    H Don.: {this.props.molecule_stats.descriptors.h_don}
                </div>
                <div class="row">
                    logP: {Number(this.props.molecule_stats.descriptors.logP).toFixed(2)}
                </div>
                <div class="row">
                    Rings: {this.props.molecule_stats.descriptors.rings}
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
                        molecule_stats={this.props.all_mol_info[this.props.saved_mol_list[i][0] + this.props.saved_mol_list[i][1]]}
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
            assay_selection: { pIC50: 'No', c_mouse: 'No', c_human: 'No', LogD: 'No', PAMPA: 'No' },
            all_mol_info: {},
        };
        this.getSavedMolecules();
    }

    getAssays = () => {
        const base_url = 'http://127.0.0.1:5000/assays?' +
            'r1=' + this.state.selected_mol[0] +
            '&r2=' + this.state.selected_mol[1] +
            '&pic50=' + this.state.assay_selection.pIC50 +
            '&clearance_mouse=' + this.state.assay_selection.c_mouse +
            '&clearance_human=' + this.state.assay_selection.c_human +
            '&logd=' + this.state.assay_selection.LogD +
            '&pampa=' + this.state.assay_selection.PAMPA
        fetch(base_url)
            .then((response) => response.json())
            .then(response => {
                this.updateDict(response, 'assays')
            })
            .catch(err => {
                throw Error(err.message);
            });
        this.resetSelection();
        this.props.updateTimeAndMoneyCallback();
    }

    getDescriptors = () => {
        const base_url = 'http://127.0.0.1:5000/descriptors?' +
            'r1=' + this.state.selected_mol[0] +
            '&r2=' + this.state.selected_mol[1]
        fetch(base_url)
            .then((response) => response.json())
            .then(response => {
                this.updateDict(response, 'descriptors')
            })
    }

    getFilters = () => {
        const base_url = 'http://127.0.0.1:5000/lipinski?' +
            'r1=' + this.state.selected_mol[0] +
            '&r2=' + this.state.selected_mol[1]
        fetch(base_url)
            .then((response) => response.json())
            .then(response => {
                this.updateDict(response, 'lipinski')
            })
    }

    updateDict = (response, update_type) => {
        var dict_copy = Object.assign(this.state.all_mol_info)
        let key = Object.keys(response[update_type])[0]
        console.log(response[update_type])
        Object.keys(response[update_type][key]).forEach(function (assay_key) {
            if (!dict_copy[key].hasOwnProperty(update_type)) {
                dict_copy[key][update_type] = {}
            }
            if (!dict_copy[key][update_type].hasOwnProperty(assay_key)) {
                dict_copy[key][update_type][assay_key] = response[update_type][key][assay_key]
            }
        }
        );
        this.setState({ all_mol_info: dict_copy })
    }

    resetSelection = () => {
        this.setState({
            assay_selection: {
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
        const all_info_url = 'http://127.0.0.1:5000/get_all_mol_info'
        fetch(all_info_url)
            .then((response) => response.json())
            .then(molecule_dict => {
                this.setState({ all_mol_info: molecule_dict }, () => {
                    console.log(this.state.all_mol_info);
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
                        <MoleculeList saved_mol_list={this.state.list} all_mol_info={this.state.all_mol_info} selectMoleculeCallback={this.setSelectedMoleculeCallback} />
                    </div>
                    <div className="assay-panel">
                        <button label="pIC50" onClick={() => this.setState({ assay_selection: { ...this.state.assay_selection, pIC50: 'Yes' } })}>pIC50</button>
                        <button label="Clearance Mouse" onClick={() => this.setState({ assay_selection: { ...this.state.assay_selection, c_mouse: 'Yes' } })}>Clearance Mouse</button>
                        <button label="Clearance Human" onClick={() => this.setState({ assay_selection: { ...this.state.assay_selection, c_human: 'Yes' } })}>Clearance Human</button>
                        <button label="LogD" onClick={() => this.setState({ assay_selection: { ...this.state.assay_selection, LogD: 'Yes' } })}>LogD</button>
                        <button label="PAMPA" onClick={() => this.setState({ assay_selection: { ...this.state.assay_selection, PAMPA: 'Yes' } })}>PAMPA</button>
                        <button label="Run filters" onClick={this.getFilters}>Run filters</button>
                        <button label="Calculate Descriptors" onClick={this.getDescriptors} >Calculate Descriptors</button>
                        <button label="Run Assays" onClick={this.getAssays}>Run Assays</button>

                    </div>
                    <div className="display_molecule_bar">
                        <MoleculeImage key={this.state.selected_mol} r_groups={this.state.selected_mol} size={"800,800"} />
                        <div className='selected-mol-stats'>
                            {
                                this.state.all_mol_info.hasOwnProperty(this.state.selected_mol[0] + this.state.selected_mol[1]) &&
                                <MoleculeStats
                                    key={this.state.selected_mol}
                                    molecule_stats={this.state.all_mol_info[this.state.selected_mol[0] + this.state.selected_mol[1]]}
                                />}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export {MoleculeList, Assays}

export default Assay;