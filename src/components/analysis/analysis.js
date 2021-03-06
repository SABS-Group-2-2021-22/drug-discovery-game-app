import React from "react";
import "./analysis.css";
import SelectorPanel from "./selector_panel.js";
import MoleculeList from "./molecule_list.js";
import ThePlot from "./the_plot.js";
import { connect } from "react-redux";
import { initActions } from "../../actions";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRoche();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="analysis">
          <div className="final-molecule-bar">
            <SelectorPanel />
            <MoleculeList />
          </div>
          <div className="comparison-graph">
            <ThePlot />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const actionCreators = {
  fetchRoche: initActions.fetchRoche,
};

export default connect(mapStateToProps, actionCreators)(Analysis);
