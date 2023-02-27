import React from "react";
import Plot from "react-plotly.js";
import MoleculeImage from "./molecule_image.js";
import "./analysis.css";
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
      helpHover: false,
    };
  }

  // plot the data
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
        marker: {size: 20},
        x: v.x,
        y: v.y,
        name: k,
      });
    }
    return traces;
  }

  // update the plot axes (metrics) when the metric buttons are clicked
  relayout(param, axis) {
    if (axis == "x") {
      this.setState({ x_axis: param });
    } else if (axis == "y") {
      this.setState({ y_axis: param });
    }
  }

  // when the mouse hovers over plot's data points, the molecule image
  // ...and id for that compound is displayed as per the hover state being true
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

  // when the mouse hovers over the plot, mouse coordinate states are updated
  // ...and 'hover' is set to true
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

  //set hover to false when the mouse leaves the data point
  onUnhover = (event) => {
    this.setState({ hover: false });
  };

  onHelpHover = (event) => {
    this.setState({ helpHover: true });
  };

  onUnHelpHover = (event) => {
    this.setState({ helpHover: false });
  };

  render() {
    var axes_label = [];
    var state_iterator = [this.state.x_axis, this.state.y_axis];
    for (var i = 0, l = state_iterator.length; i < l; i++) {
      if (state_iterator[i] == "logd") {
        axes_label[i] = "LogD";
      } else if (state_iterator[i] == "pic50") {
        axes_label[i] = "pIC50";
      } else if (state_iterator[i] == "TPSA") {
        axes_label[i] = "TPSA (Å\u00b2)";
      } else if (state_iterator[i] == "MW") {
        axes_label[i] = "MW (Da)";
      } else if (state_iterator[i] == "HA") {
        axes_label[i] = "Number of Heavy Atoms";
      } else if (state_iterator[i] == "h_acc") {
        axes_label[i] = "Number of H Acceptors";
      } else if (state_iterator[i] == "h_don") {
        axes_label[i] = "Number of H Donors";
      } else if (state_iterator[i] == "logP") {
        axes_label[i] = "LogP";
      } else if (state_iterator[i] == "rings") {
        axes_label[i] = "Number of Aromatic Rings";
      } else {
        axes_label[i] = state_iterator[i];
      }
    }
    return (
      <div className="plot-container">
        <div>{this.showCard()}</div>
        <Plot
          data={this.addTraces([this.props.plot_data])}
          layout={{
            responsive: true,
            title: "Analysis Plot",
            xaxis: { title: { text: axes_label[0] } },
            yaxis: { title: { text: axes_label[1] } },
          }}
          useResizeHandler={true}
          style={{ width: "99%", height: "99%" }}
          onHover={this.onHover}
          onUnhover={this.onUnhover}
        />
        <div className="plot-button-row">
          <button
            className="help-button"
            onMouseEnter={this.onHelpHover}
            onMouseLeave={this.onUnHelpHover}
          >
            ?
          </button>
          x:&nbsp;
          <button onClick={() => this.relayout("--", "x")}>--</button>
          {this.state.helpHover && (
            <div className="help-info-text">
              <p>
                <div>{this.props.help[0]}</div>
              </p>
            </div>
          )}
          <button onClick={() => this.relayout("logd", "x")}>logD</button>
          <button onClick={() => this.relayout("pic50", "x")}>pIC50</button>
          <button onClick={() => this.relayout("TPSA", "x")}>TPSA</button>
          <button onClick={() => this.relayout("HA", "x")}>HA</button>
          <button onClick={() => this.relayout("MW", "x")}>MW</button>
          <button onClick={() => this.relayout("h_acc", "x")}>h acc</button>
          <button onClick={() => this.relayout("h_don", "x")}>h don</button>
          <button onClick={() => this.relayout("rings", "x")}># rings</button>
          <button onClick={() => this.relayout("logP", "x")}>logP</button>
        </div>
        <div className="plot-button-row">
          y:&nbsp;
          <button onClick={() => this.relayout("--", "y")}>--</button>
          <button onClick={() => this.relayout("logd", "y")}>logD</button>
          <button onClick={() => this.relayout("pic50", "y")}>pIC50</button>
          <button onClick={() => this.relayout("TPSA", "y")}>TPSA</button>
          <button onClick={() => this.relayout("HA", "y")}>HA</button>
          <button onClick={() => this.relayout("MW", "y")}>MW</button>
          <button onClick={() => this.relayout("h_acc", "y")}>h acc</button>
          <button onClick={() => this.relayout("h_don", "y")}>h don</button>
          <button onClick={() => this.relayout("rings", "y")}># rings</button>
          <button onClick={() => this.relayout("logP", "y")}>logP</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    plot_data: state.analysis.plot_data,
    help: state.init.help.analysis,
  };
}

export default connect(mapStateToProps)(ThePlot);
