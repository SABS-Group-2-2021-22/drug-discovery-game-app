import React, { Component } from "react";
import Plot from "react-plotly.js";
import "./analysis.css";
import ThePlot from './ThePlot.js'

class Rubbish extends React.Component {
  render() {
    return (
      <div>Bla</div>
    )
  }
}

class Analysis extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value_A: 0, value_B: 0, final: [0, 0] };

    this.handleSelect_A = this.handleSelect_A.bind(this);
    this.handleSelect_B = this.handleSelect_B.bind(this);
    this.chooseMolecule = this.chooseMolecule.bind(this);
    this.fetchChosenMolecule = this.fetchChosenMolecule.bind(this);
  }

  handleSelect_A(event) {
    this.setState({ value_A: event.target.value });
  }

  handleSelect_B(event) {
    this.setState({ value_B: event.target.value });
  }

  chooseMolecule() {
    const base_url = 'http://127.0.0.1:5000/choose';
    fetch(base_url + '?r1=' + this.state.value_A + '&r2=' + this.state.value_B, { method: "POST" });

  }

  fetchChosenMolecule() {
    const base_url = 'http://127.0.0.1:5000/chosenmolecule'
    fetch(base_url)
      .then((response) => response.json())
      .then(chosen_mol => {
        this.setState({ final: chosen_mol.chosen_mol })
        console.log(chosen_mol)
        console.log(this.state.final)
      })
      .catch(err => {
        throw Error(err.message);
      });
  };


  render() {
    return (
      <div className="analysis">
        <select name="selectList" id="selectList" onChange={this.handleSelect_A}>
          {Array.from({ length: 50 }, (_, i) => <option value={i}>{"A0" + i}</option>)}
        </select>
        <select name="selectList" id="selectList" onChange={this.handleSelect_B}>
          {Array.from({ length: 50 }, (_, i) => <option value={i}>{"B0" + i}</option>)}
        </select>

        <div>You selected {this.state.value_A} and {this.state.value_B}</div>
        <div>
          <button onClick={() => this.chooseMolecule()}>Choose This Molecule</button>
        </div>
        <div>
          <button onClick={() => this.fetchChosenMolecule()}>Reveal final molecule</button>
        </div>
        <div>
          You have chosen {this.state.final[0][0]} and {this.state.final[0][1]} as the final molecule
        </div><
          div className="comparison_graph">
          <ThePlot />
        </div>

      </div>
    );
  }
}

export default Analysis;
