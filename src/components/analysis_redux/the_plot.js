import React from "react";
import Plot from "react-plotly.js";
import  MoleculeImage  from "./molecule_image.js";
import "../analysis.css";
import { connect } from "react-redux";

class ThePlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x_axis: "--",
      y_axis: "--",
      hover_mol: ["A01", "B01"],
      hover: false,
      xpositionState: 0,
      ypositionState: 0,
    };
  }

  addTraces(data) {
    var lines = {};
    data.forEach((data) => {
      for (let k in data) {
        lines[k] = {
          x: [data[k][this.state.x_axis]],
          y: [data[k][this.state.y_axis]],
        };
      }
    });
    let traces = [];
    for (const [k, v] of Object.entries(lines)) {
      traces.push({
        type: "scatter",
        mode: "markers",
        x: v.x,
        y: v.y,
        name: k,
      });
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
            mol_id={this.state.hover_mol}
          />
        </figure>
      );
    }
  }

  onHover = (event) => {
    event.points.forEach((point) => {
      this.setState({ hover_mol: point.data.name, hover: true });
      const getMousePos = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        this.setState({ xpositionState: posX + 15 });
        this.setState({ ypositionState: posY + 15 });
      };
      document.addEventListener("mousemove", getMousePos);
      return function cleanup() {
        document.removeEventListener("mousemove", getMousePos);
      };
    });
  };

  onUnhover = (event) => {
    this.setState({ hover: false });
  };

  render() {
    return (
      <div>
        <div>{this.showCard()}</div>
        <Plot
          data={this.addTraces([this.props.plot_data])}
          layout={{
            width: 1000,
            height: 500,
            title: "Analysis Plot",
            xaxis: { title: { text: this.state.x_axis } },
            yaxis: { title: { text: this.state.y_axis } },
          }}
          onHover={this.onHover}
          onUnhover={this.onUnhover}
        />
        <div>
          <button onClick={() => this.relayout("--", "x")}>--</button>
          <button onClick={() => this.relayout("logd", "x")}>logd</button>
          <button onClick={() => this.relayout("pic50", "x")}>pIC50</button>
          <button onClick={() => this.relayout("TPSA", "x")}>TPSA</button>
          <button onClick={() => this.relayout("HA", "x")}>HA</button>
          <button onClick={() => this.relayout("MW", "x")}>MW</button>
          <button onClick={() => this.relayout("h_acc", "x")}>h acc</button>
          <button onClick={() => this.relayout("h_don", "x")}>h don</button>
          <button onClick={() => this.relayout("rings", "x")}>rings</button>
          <button onClick={() => this.relayout("logP", "x")}>logP</button>
        </div>
        <div>
          <button onClick={() => this.relayout("--", "y")}>--</button>
          <button onClick={() => this.relayout("logd", "y")}>logd</button>
          <button onClick={() => this.relayout("pic50", "y")}>pIC50</button>
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

function mapStateToProps(state) {
  return {
    plot_data: state.plot_data,
  };
}

export default connect(mapStateToProps)(ThePlot);
