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
      user_ori_r:[],
      ref_ori_r:[],
      features : ['Human Clearance','Mouse Clearance','LogD','PAMPA','pIC50'],
    };
  }

  //restructure data from the store objec to local state objects
  restructureData = () => {

    for (const [key, value] of Object.entries(this.props.chosen_mol_spider)) {
      console.log(value)
      this.state.user_r.push(value);
      this.state.user_params.push(key);
    }
    for (const [key, value] of Object.entries(this.props.ref_mol_spider)) {
      this.state.ref_r.push(value);
      this.state.ref_params.push(key);
    }
    for (const [key, value] of Object.entries(this.props.saved_mols[this.props.mol_id].data.drug_props)){
      console.log(value);
      if (key !== "docking_affinity"){
      if (isNaN(value)){
        this.state.user_ori_r.push(`${value}`);
      }
      else {
        this.state.user_ori_r.push(value);
      };
    }
    }
    for (const [key, value] of Object.entries(this.props.Roche.data.drug_props)){
      if (key !== "docking_affinity"){
      if (isNaN(value)){
        this.state.ref_ori_r.push(`${value}`);
      }
      else{
        this.state.ref_ori_r.push(value);
      };
      }
    }
  }
  addTraces = () => {
    this.restructureData();
    let feature = this.state.features;
    let value = this.state.user_r;
    let valueref = this.state.ref_r;
    let userbardata = this.state.user_ori_r;
    let refbardata = this.state.ref_ori_r;
    let hovertemplate = '<b>%{x}</b><br>%{customdata}';
    let data = [
    {
      type: "bar",
      y: value,
      x: feature,
      fill: "toself",
      name: "Chosen Molecule",
      hovertemplate: hovertemplate,
      customdata: userbardata,
    },
    {
      type: "bar",
      y: valueref,
      x: feature,
      fill: "toself",
      name: "Desired profile",
      hovertemplate: hovertemplate,
      customdata: refbardata,
    },
  ];

  return data;
  }

  layout() {
    let layout = {
      responsive: false,
      title: '',
      xaxis: {
        title: ''
      },
      barmode: 'group',
      showlegend: true,
      displayModeBar: false
    };
    return layout;
  }
  
  render() {

    return (
      <div className="spider-plot-container">
        <Plot
          data={this.addTraces()}
          layout={this.layout()}
          config={{ displayModeBar: false }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Roche: state.init.Roche,
    saved_mols: state.assay.saved_mols,
    chosen_mol_spider: state.analysis.spider_data.data.param_dict["0"],
    ref_mol_spider: state.analysis.spider_data.data.param_dict["1"],
  };
}

export default connect(mapStateToProps)(SpiderPlot);
