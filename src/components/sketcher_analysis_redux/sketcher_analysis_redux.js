import React from "react";
import "../analysis.css";
import SketcherSelectorPanel from "./sketcher_selector_panel.js";
import SketcherMoleculeList from "./sketcher_molecule_list.js";
import SketcherThePlot from "./sketcher_the_plot.js";
import { fetchRoche } from "../../actions";
import { connect } from "react-redux";

class SketcherAnalysisRedux extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchRoche())
  }

  render() {
    console.log('analysis')
    return (
      <div className="wrapper">
        <div className="analysis">
          <div className="final-molecule-bar">
            <SketcherSelectorPanel />
            <SketcherMoleculeList />
          </div>
          <div className="comparison-graph">
            <SketcherThePlot />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(SketcherAnalysisRedux);
