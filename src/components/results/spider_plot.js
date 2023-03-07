import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";

class SpiderPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_num: [],
      ref_num: [],
      user_cat: [],
      ref_cat: [],
      catg_features : ['Human Clearance','Mouse Clearance',"PAPMA"],
      num_features : ['LogD','pIC50'],
    };
  }
  srcRoute = () => {
    if (this.props.mol_id === "Roche") {
      return this.props.Roche.data.drug_props;
    } else {
      return this.props.saved_mols[this.props.mol_id].data.drug_props;
    }
  };
  //restructure data from the store objec to local state objects
  restructureData = () => {


 
    for (const [key, value] of Object.entries(this.srcRoute())) {
      console.log(key,"value:",value)
      let pushval = "";
      if (isNaN(value) && key !== 'pic50')
      { if (value.match(/low.*/)) {pushval = 'low'};
        if (value.match(/med.*/)) {pushval = 'med'};
        if (value.match(/high.*/)) {pushval = 'high'};
        if (value.match(/low2med.*/)) {pushval = 'low2med'};
        if (value.match(/med2high.*/)) {pushval = 'med2high'};
        this.state.user_cat.push(pushval);
      }
      else{
        this.state.user_num.push(value)
      }

    }
    for (const [key, value] of Object.entries(this.props.Roche.data.drug_props)) {
      console.log("ref",key,"value:",value)
      let pushval = "";
      if (isNaN(value) && key !== 'pic50')
      { if (value.match(/low.*/)) {pushval = 'low'};
        if (value.match(/med.*/)) {pushval = 'med'};
        if (value.match(/high.*/)) {pushval = 'high'};
        if (value.match(/low2med.*/)) {pushval = 'low2med'};
        if (value.match(/med2high.*/)) {pushval = 'med2high'};
        this.state.ref_cat.push(pushval);
      }
      else{
        this.state.ref_num.push(value);
      }

    }
  }
  addTraces1 = () => {
    this.restructureData();
    let catg_features = this.state.catg_features;
    let value = this.state.user_cat;
    let valueref = this.state.ref_cat;
    let data = [
    {
      type: "bar",
      y: value,
      x: catg_features,
      fill: "toself",
      name: "Chosen Molecule",
    },
    {
      type: "bar",
      y: valueref,
      x: catg_features,
      fill: "toself",
      name: "Desired profile",
    },
  ];

  return data;
  }

  layout1() {
    let layout = {
      responsive: false,
      xaxis: {
        title: ''
      },
      yaxis: {
        categoryorder: 'array',
        categoryarray: ['','low', 'low2med', 'med', 'med2high', 'high']
      },
      barmode: 'group',
      showlegend: true
    };
    return layout;
  }
  addTraces2 = () => {
    this.restructureData();
    let num_features = this.state.num_features;
    let value = this.state.user_num;
    let valueref = this.state.ref_num;
    let data = [
    {
      type: "bar",
      y: value,
      x: num_features,
      fill: "toself",
      name: "Chosen Molecule",
    },
    {
      type: "bar",
      y: valueref,
      x: num_features,
      fill: "toself",
      name: "Desired profile",
    },
  ];

  return data;
  }

  layout2() {
    let layout = {
      responsive: false,
      xaxis: {
        title: ''
      },
      barmode: 'group',
      showlegend: true
    };
    return layout;
  }  
  render() {

    return (
      <div className="spider-plot-container">
        <Plot
          data={this.addTraces1()}
          layout={this.layout1()}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          
        />
          <Plot
          data={this.addTraces2()}
          layout={this.layout2()}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    chosen_mol_spider: state.analysis.spider_data.data.param_dict["0"],
    ref_mol_spider: state.analysis.spider_data.data.param_dict["1"],
    Roche: state.init.Roche,
  };
}

export default connect(mapStateToProps)(SpiderPlot);
