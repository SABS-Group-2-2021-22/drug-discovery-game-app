import React from "react";
import "../analysis.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";
import { analysisActions } from "../../actions";
import { Link } from "react-router-dom";

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  chooseMolecule = () => {
    this.props.chooseMolecule(this.props.selected_mol);
  };

  fetchSpider = () => {
    this.props.fetchSpiderObj();
  };

  fetchCompText = () => {
    this.props.fetchCompText();
  };

  submitResult = () => {
    this.fetchSpider();
    this.fetchCompText();
  };

  render() {
    return (
      <div className="control-panel">
        <button onClick={this.chooseMolecule}>Choose This Molecule</button>
        <Link to="/results">
          <button onClick={this.submitResult}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selected_mol,
    chosen_mol: state.chosen_mol,
  };
}

const actionCreators = {
  chooseMolecule: selectorActions.chooseMolecule,
  fetchSpiderObj: analysisActions.fetchSpiderObj,
  fetchCompText: analysisActions.fetchCompText,
}

export default connect(mapStateToProps, actionCreators)(SelectorPanel);
