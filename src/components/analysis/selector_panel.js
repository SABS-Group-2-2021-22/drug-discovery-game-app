import React from "react";
import "./analysis.css";
import { connect } from "react-redux";
import { selectorActions } from "../../actions";
import { Link } from "react-router-dom";

class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpHover: false,
    };
  }

  
  
  selectMolecule = () => {
    this.props.selectMolecule(this.props.mol_id);
  };

  onHelpHover = (event) => {
    this.setState({ helpHover: true });
  };

  onUnHelpHover = (event) => {
    this.setState({ helpHover: false });
  };

  render() {
    return (
        <div className="selector-panel">
          <button
            className="help-button"
            onMouseEnter={this.onHelpHover}
            onMouseLeave={this.onUnHelpHover}
          >
            ?
          </button>
         {this.state.helpHover && (
          <div className="help-info-text">
            <p>
              <div>{this.props.help[1]}</div>
            </p>
          </div>
          )}
        <div className="selector-panel-select-button">
          <Link to="/results">
              <button onClick={this.chooseMolecule}>Select Final Candidate →</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    selected_or_not: state.selector.selected_or_not,
    gamemode: state.game.gamemode,
    help: state.init.help.analysis,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(SelectorPanel);
