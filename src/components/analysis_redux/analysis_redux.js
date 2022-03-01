import React from "react";
import "../analysis.css";
import SelectorPanel from "./selector_panel.js";
import MoleculeList from "./molecule_list.js";
import ThePlot from "./the_plot.js";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div className="wrapper">
      <div className="analysis">
        <div className="final-molecule-bar">
          <SelectorPanel/>
          <MoleculeList/>
        </div>
        <div className="comparison-graph">
          <ThePlot/>
        </div>
      </div>
    </div>;
  }
}

export default Analysis