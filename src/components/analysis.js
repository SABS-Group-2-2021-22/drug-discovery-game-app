import React, { Component } from "react";
import Plot from "react-plotly.js";
import "./analysis.css";
import ThePlot from './ThePlot.js'

class Analysis extends React.Component {

  render() {
    return (
      <div className="analysis">
        <div className="molecule_list">Molecule list + button</div>
        <div className="comparison_graph">
          <ThePlot/>
        </div>
      </div>
    );
  }
}

export default Analysis;
