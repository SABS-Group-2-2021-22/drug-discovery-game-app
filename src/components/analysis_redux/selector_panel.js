import React from "react";
import "../analysis.css";
import { connect } from "react-redux";
import { chooseMolecule } from "../../actions";
import { fetchSpiderObj } from "../../actions";
import { fetchCompText } from "../../actions";
import { Link } from "react-router-dom";

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  chooseMolecule = () => {
    this.props.dispatch(chooseMolecule(this.props.selected_mol));
  };

  fetchSpider = () => {
    this.props.dispatch(fetchSpiderObj())
  };

  fetchCompText = () => {
    this.props.dispatch(fetchCompText())
  }

  submitResult = () => {
    this.fetchSpider();
    this.fetchCompText();
  }


  render() {
    return (
      <div className="control-panel">
        <button onClick={this.chooseMolecule}>Choose This Molecule</button>
        <Link to="/results">
          <button onClick={this.submitResult}>Reveal Final Molecule</button>
        </Link>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selected_mol,
    chosen_mol: state.chosen_mol,
  };
}

export default connect(mapStateToProps)(SelectorPanel);
