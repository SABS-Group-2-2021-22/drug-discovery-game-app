import React, { Component, useEffect } from "react";
import Plot from "react-plotly.js";
import { MoleculeImage } from './build';
import './analysis.css'


class ThePlot extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      layout: {},
      revision: 0,
      x_axis: "--",
      y_axis: "--",
      hover_mol: ['A01', 'B01'],
      hover: false,
      xpositionState: 0,
      ypositionState: 0
    };
    this.retrieveAssayData();
  }

  retrieveAssayData() {
    const url = 'http://127.0.0.1:5000/getplotdata'
    fetch(url)
      .then((response) => response.json())
      .then(response => {
        this.setState({ data: response.assay_dict }, () => {
          console.log(this.state.data);
          console.log(response)
        })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }


  addTraces(data) {
    var lines = {};
    data.forEach((data) => {
      for (let key in data) {
        lines[key] = {
          x: [data[key][this.state.x_axis]],
          y: [data[key][this.state.y_axis]],
        };
      }
    });

    let traces = [];
    for (const [key, value] of Object.entries(lines)) {
      traces.push({
        type: "scatter",
        mode: "markers",
        x: value.x,
        y: value.y,
        name: key,
      })
    }
    return traces;
  }

  relayout(param, axis) {
    if (axis == "x") {
      this.setState({ x_axis: param });
    } else if (axis == "y") {
      this.setState({ y_axis: param });
    }
  }

  showCard() {
    if (this.state.hover == true) {
      return (
        <figure
          className="show-hover"
          style={{
            position: "fixed",
            zIndex: 2,
            minWidth: 120,
            opacity: 0.95,
            display: "flex",
            flexShrink: 0,
            left: this.state.xpositionState,
            top: this.state.ypositionState,
          }}
        >
          <MoleculeImage
            key={this.state.hover_mol}
            r_groups={this.state.hover_mol}
            size={"250,250"}
          />
        </figure>
      );
    }
  }

  onHover = event => {
    event.points.forEach(point => {
      let mol = point.data.name
      let r_arr = [mol.slice(0, 3), mol.slice(3, 6)]
      this.setState({ hover_mol: r_arr, hover: true })
      const getMousePos = e => {

        const posX = e.clientX;
        const posY = e.clientY;
        this.setState({ xpositionState: posX + 15 });
        this.setState({ ypositionState: posY + 15 })
      }
      document.addEventListener("mousemove", getMousePos);
      return function cleanup() {
        document.removeEventListener("mousemove", getMousePos)
      };

    })
  }

  onUnhover = event => {
    this.setState({ hover: false })

  }

  render() {
    return (
      <div className='plot-container'>
        <div>
          {this.showCard()}
        </div>
        <Plot
          data={this.addTraces(this.state.data)}
          layout={{
            responsive: true,
            title: "Analysis Plot",
            xaxis: { title: { text: this.state.x_axis } },
            yaxis: { title: { text: this.state.y_axis } },
          }}
          useResizeHandler={true}
          style={{width: '100%',
          height: '90%'}}
          onHover={this.onHover}
          onUnhover={this.onUnhover}
        />
        <div className='plot-button-row'>
          <button onClick={() => this.relayout("--", "x")}>--</button>
          <button onClick={() => this.relayout("logd", "x")}>logd</button>
          <button onClick={() => this.relayout("pic50", "x")}>pic50</button>
          <button onClick={() => this.relayout("TPSA", "x")}>TPSA</button>
          <button onClick={() => this.relayout("HA", "x")}>HA</button>
          <button onClick={() => this.relayout("MW", "x")}>MW</button>
          <button onClick={() => this.relayout("h_acc", "x")}>h acc</button>
          <button onClick={() => this.relayout("h_don", "x")}>h don</button>
          <button onClick={() => this.relayout("rings", "x")}>rings</button>
          <button onClick={() => this.relayout("logP", "x")}>logP</button>
        </div>
        <div className='plot-button-row'>
          <button onClick={() => this.relayout("--", "y")}>--</button>
          <button onClick={() => this.relayout("logd", "y")}>logd</button>
          <button onClick={() => this.relayout("pic50", "y")}>pic50</button>
          <button onClick={() => this.relayout("TPSA", "y")}>TPSA</button>
          <button onClick={() => this.relayout("HA", "y")}>HA</button>
          <button onClick={() => this.relayout("MW", "y")}>MW</button>
          <button onClick={() => this.relayout("h_acc", "y")}>h acc</button>
          <button onClick={() => this.relayout("h_don", "y")}>h don</button>
          <button onClick={() => this.relayout("rings", "y")}>rings</button>
          <button onClick={() => this.relayout("logP", "y")}>logP</button>
        </div>
      </div>

    );
  }
}




export default ThePlot;






