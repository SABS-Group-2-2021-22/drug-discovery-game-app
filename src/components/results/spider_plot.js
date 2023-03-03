import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
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

  //restructure data from the store objec to local state objects
  restructureData = () => {

    for (const [key, value] of Object.entries(this.props.chosen_mol_spider)) {
      this.state.user_r.push(value);
      this.state.user_params.push(key);
    }
    for (const [key, value] of Object.entries(this.props.ref_mol_spider)) {
      this.state.ref_r.push(value);
      this.state.ref_params.push(key);
    }
  }
  addTraces = () => {
    this.restructureData();
    let data = [
      {
        type: "bar",
        y: this.state.user_r,
        x: this.state.user_params,
        fill: "toself",
        name: "Chosen Molecule",
      },
      {
        type: "bar",
        y: this.state.ref_r,
        x: this.state.ref_params,
        fill: "toself",
        name: "Desired profile",
      },
    ];
    
    return data;
  }

  layout() {
    let layout = {
      responsive: true,
      title: 'Comparison Chart',
      xaxis: {
        title: 'Feature'
      },
      yaxis: {
        title: 'Value',
        range: [0, 8],
      },
      
      barmode: 'group',
      showlegend: true
    };
    return layout;
  }
  
  render() {
    // setTimeout(() => {
    //   this.setState({ shouldRenderPlot: true });
    // }, 2500);
  
    // if (!this.state.shouldRenderPlot) {
    //   return (
    //     <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    //       <Spinner animation="border" variant="primary" />
    //     </div>
    //   );
    // }
    return (
      <div className="spider-plot-container">
        <Plot
          data={this.addTraces()}
          layout={this.layout()}
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
  };
}

export default connect(mapStateToProps)(SpiderPlot);
