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

  // Fire the chooseMolecule or chooseSketcherMolecule (mode dependent) when
  // ...the choose molecule button is clicked
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
    return ( <div>
        <div className="selector-panel">
        <div className="selector-panel-select-button">
          <Link to="/results">
              <button>Select Final Candidate</button>
          </Link>
        </div>
        <button
            className="help-button"
            onMouseEnter={this.onHelpHover}
            onMouseLeave={this.onUnHelpHover}
          >
            ?
        </button>
        </div>
        {this.state.helpHover && (
            <div className="help-info-text">
              <p>
                <div>{this.props.help[1]}</div>
              </p>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol,
    selected_or_not: state.selector.selected_or_not,
    chosen_mol: state.selector.chosen_mol,
    gamemode: state.game.gamemode,
    help: state.init.help.analysis,
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(SelectorPanel);
