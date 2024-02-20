import React from "react";
import Plot from "react-plotly.js";
import MoleculeImage from "./molecule_image.js";
import "./analysis.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        <div className="plot-button-bigpanel">
        <div className="plot-button-panel">
          <div className="plot-button-row">
            <p>
            x-axis:&nbsp;
            </p>
            {this.state.x_axis == 'logd' && (<div className="activebutton">
              <button onClick={() => this.relayout("logd", "x")}>LogD</button></div>)}
            {this.state.x_axis != 'logd' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("logd", "x")}>LogD</button></div>)}

            {this.state.x_axis == 'pic50' && (<div className="activebutton">
              <button onClick={() => this.relayout("pic50", "x")}>pIC<sub>50</sub></button></div>)}
            {this.state.x_axis != 'pic50' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("pic50", "x")}>pIC<sub>50</sub></button></div>)}

            {this.state.x_axis == 'TPSA' && (<div className="activebutton">
              <button onClick={() => this.relayout("TPSA", "x")}>TPSA</button></div>)}
            {this.state.x_axis != 'TPSA' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("TPSA", "x")}>TPSA</button></div>)}

            {this.state.x_axis == 'HA' && (<div className="activebutton">
              <button onClick={() => this.relayout("HA", "x")}>HA</button></div>)}
            {this.state.x_axis != 'HA' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("HA", "x")}>HA</button></div>)}

            {this.state.x_axis == 'MW' && (<div className="activebutton">
              <button onClick={() => this.relayout("MW", "x")}>MW</button></div>)}
            {this.state.x_axis != 'MW' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("MW", "x")}>MW</button></div>)}

            {this.state.x_axis == 'h_acc' && (<div className="activebutton">
              <button onClick={() => this.relayout("h_acc", "x")}>H Acc.</button></div>)}
            {this.state.x_axis != 'h_acc' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("h_acc", "x")}>H Acc.</button></div>)}

            {this.state.x_axis == 'h_don' && (<div className="activebutton">
              <button onClick={() => this.relayout("h_don", "x")}>H Don.</button></div>)}
            {this.state.x_axis != 'h_don' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("h_don", "x")}>H Don.</button></div>)}
            
            {this.state.x_axis == 'rings' && (<div className="activebutton">
              <button onClick={() => this.relayout("rings", "x")}>Rings</button></div>)}
            {this.state.x_axis != 'rings' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("rings", "x")}>Rings</button></div>)}

            {this.state.x_axis == 'logP' && (<div className="activebutton">
              <button onClick={() => this.relayout("logP", "x")}>LogP</button></div>)}
            {this.state.x_axis != 'logP' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("logP", "x")}>LogP</button></div>)}
  
          </div>
          <div className="plot-button-row">
            <p>
            y-axis:&nbsp;
            </p>
            {this.state.y_axis == 'logd' && (<div className="activebutton">
              <button onClick={() => this.relayout("logd", "y")}>LogD</button></div>)}
            {this.state.y_axis != 'logd' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("logd", "y")}>LogD</button></div>)}

            {this.state.y_axis == 'pic50' && (<div className="activebutton">
              <button onClick={() => this.relayout("pic50", "y")}>pIC<sub>50</sub></button></div>)}
            {this.state.y_axis != 'pic50' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("pic50", "y")}>pIC<sub>50</sub></button></div>)}

            {this.state.y_axis == 'TPSA' && (<div className="activebutton">
              <button onClick={() => this.relayout("TPSA", "y")}>TPSA</button></div>)}
            {this.state.y_axis != 'TPSA' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("TPSA", "y")}>TPSA</button></div>)}

            {this.state.y_axis == 'HA' && (<div className="activebutton">
              <button onClick={() => this.relayout("HA", "y")}>HA</button></div>)}
            {this.state.y_axis != 'HA' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("HA", "y")}>HA</button></div>)}

            {this.state.y_axis == 'MW' && (<div className="activebutton">
              <button onClick={() => this.relayout("MW", "y")}>MW</button></div>)}
            {this.state.y_axis != 'MW' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("MW", "y")}>MW</button></div>)}

            {this.state.y_axis == 'h_acc' && (<div className="activebutton">
              <button onClick={() => this.relayout("h_acc", "y")}>H Acc.</button></div>)}
            {this.state.y_axis != 'h_acc' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("h_acc", "y")}>H Acc.</button></div>)}

            {this.state.y_axis == 'h_don' && (<div className="activebutton">
              <button onClick={() => this.relayout("h_don", "y")}>H Don.</button></div>)}
            {this.state.y_axis != 'h_don' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("h_don", "y")}>H Don.</button></div>)}
            
            {this.state.y_axis == 'rings' && (<div className="activebutton">
              <button onClick={() => this.relayout("rings", "y")}>Rings</button></div>)}
            {this.state.y_axis != 'rings' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("rings", "y")}>Rings</button></div>)}

            {this.state.y_axis == 'logP' && (<div className="activebutton">
              <button onClick={() => this.relayout("logP", "y")}>LogP</button></div>)}
            {this.state.y_axis != 'logP' && (<div className="inactivebutton">
              <button onClick={() => this.relayout("logP", "y")}>LogP</button></div>)}
            
          </div>
        </div>
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
