import React, { Component } from "react";
import "./analysis.css";

import { Link } from "react-router-dom"

import ThePlot from './ThePlot.js'
import { MoleculeList } from './assay';


class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_r_groups: props.current_r_groups,
    };
  }

  chooseMolecule = () => {
    this.props.chooseMoleculeCallback()
  }

  submitMolecule = () => {
    this.props.submitMoleculeCallback()
  }

  render() {
    const { text } = this.state;
    return (
      <div className="control-panel">
        <button onClick={this.chooseMolecule}>Choose This Molecule</button>
        <Link to='/results'>
          <button onClick={this.submitMolecule}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  }
}

class Analysis extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      clicked_mol: ['A01', 'B01'],
      all_mol_info: {},
      chosen_mol: undefined,
    };
    this.getSavedMolecules();

  }

  getSavedMolecules = () => {
    const url = 'https://drug-discovery-game-backend.herokuapp.com/savedmolecules'
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
    const all_info_url = 'https://drug-discovery-game-backend.herokuapp.com/get_all_mol_info'
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
    this.setState({ clicked_mol: r_group_ids }, () => {
      console.log(this.state.clicked_mol);
    })
  }

  chooseMoleculeCallback = () => {
    this.setState({ chosen_mol: this.state.clicked_mol })
  }

  submitMoleculeCallback = () => {
    const base_url = 'https://drug-discovery-game-backend.herokuapp.com/choose';
    fetch(base_url +
      '?r1=' + this.state.chosen_mol[0] +
      '&r2=' + this.state.chosen_mol[1],
      { method: "POST" }
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="analysis">
          <div className="final-molecule-bar">
            <SelectorPanel
              chooseMoleculeCallback={this.chooseMoleculeCallback}
              submitMoleculeCallback={this.submitMoleculeCallback}
            />
            <MoleculeList
              saved_mol_list={this.state.list}
              all_mol_info={this.state.all_mol_info}
              selectMoleculeCallback={this.setSelectedMoleculeCallback}
            />
          </div>
          <div className="comparison-graph">
            <ThePlot />
          </div>

        </div>
      </div>
    );
  }
}

export default Analysis;
