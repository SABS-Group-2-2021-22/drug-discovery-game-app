import React, { Component } from "react";
import Plot from "react-plotly.js";


class ThePlot extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      layout: {},
      revision: 0,
      x_axis: "--",
      y_axis: "--",
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
                })
            })
            .catch(err => {
                throw Error(err.message);
            });
  }

 /*
 componentDidMount() {
   const endpoint = "http://127.0.0.1:5000/plot";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: Array.from(data) });
      });
  }
*/


  addTraces(data) {
    var lines = {};
    console.log(data)
    data.forEach((data) => {
      for (let key in data) {
        console.log(key);
        lines[key] = {
          x: [data[key][this.state.x_axis]],
          y: [data[key][this.state.y_axis]],
        };
      }
    });

    console.log(lines);
    let traces = [];
    for (const [key, value] of Object.entries(lines)) {
      traces.push({
        type: "scatter",
        mode: "markers",
        x: value.x,
        y: value.y,
        name: key,
      });
    }
    return traces;
  }

/*  createButtons(data, axis) {
    const params = [
      "--",
      "logd",
      "TPSA",
      "HA",
      "MW",
      "h_acc",
      "h_don",
      "rings",
      "logP",
    ];

    let buttons = [];
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      var axis_arr = [];
      var key_arr = [];
      data.forEach((data) => {
        for (let key in data) {
          axis_arr.push([data[key][param]]);
          key_arr.push(parseInt(key));
        }
      });
      var axis_dict = new Object();
      buttons.push({
        args: [(axis_dict[axis] = axis_arr), key_arr],
        method: "update",
        name: param,
        label: param,
      });
    }
    console.log(buttons);
    return buttons;
  }

  updateMenus() {
    var updatemenus = [
      {
        buttons: this.createButtons(this.state.data, "x"),
        showactive: true,
        x: 0.45,
        y: 1.05,
      },
      {
        buttons: this.createButtons(this.state.data, "y"),
        showactive: true,
        x: 0.55,
        y: 1.05,
      },
    ];
    console.log(updatemenus);
    return updatemenus;
  }

*/

  relayout(param, axis) {
    console.log(axis);

    if (axis == "x") {
      this.setState({ x_axis: param });
    } else if (axis == "y") {
      this.setState({ y_axis: param });
    }
  }

  render() {
    return (
      <div>
        <Plot
          data={this.addTraces(this.state.data)}
          layout={{
            width: 1000,
            height: 500,
            title: "Analysis Plot",
            xaxis: { title: { text: this.state.x_axis } },
            yaxis: { title: { text: this.state.y_axis } },
          }}
        />
        <div>
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
        <div>
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






