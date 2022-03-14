import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";

class SpiderPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_r: [],
      user_params: [],
      ref_r: [],
      ref_params: [],
    };
  }

  restructureData() {
    for (const [key, value] of Object.entries(this.props.chosen_mol_spider)) {
      this.state.user_r.push(value);
      this.state.user_params.push(key);
    }
    for (const [key, value] of Object.entries(this.props.ref_mol_spider)) {
      this.state.ref_r.push(value);
      this.state.ref_params.push(key);
    }
  }

  addTraces() {
    this.restructureData();
    let data = [
      {
        type: "scatterpolar",
        r: this.state.user_r,
        theta: this.state.user_params,
        fill: "toself",
        name: "Chosen Molecule",
      },
      {
        type: "scatterpolar",
        r: this.state.ref_r,
        theta: this.state.ref_params,
        fill: "toself",
        name: "Roche's Molecule",
      },
    ];
    return data;
  }

  layout() {
    let layout = {
      autosize: false,
      width: 500,
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 8],
        },
      },
      showlegend: true,
    };
    return layout;
  }

  render() {
    return (
      <div>
        <Plot data={this.addTraces()} layout={this.layout()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        chosen_mol_spider: state.sketcher.spider_data.data.param_dict['0'],
        ref_mol_spider: state.sketcher.spider_data.data.param_dict['1']
    }
}

export default connect(mapStateToProps)(SpiderPlot)
