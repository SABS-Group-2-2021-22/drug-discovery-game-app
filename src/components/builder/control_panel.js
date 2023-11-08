import React from "react";
import "./builder.css";
import { connect } from "react-redux";
import { selectorActions, assayActions, gameActions } from "../../actions";
import { Link } from "react-router-dom";
import { compile_game_data } from "../helpers/helpers";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  // save the built molecule in the store
  saveMolecule = () => {
    console.log(this.props.selected_r_groups)
    if (this.props.selected_r_groups.A == 'A00' || this.props.selected_r_groups.B == 'B00'){
      console.log('Blocked')
    }
    else{
    this.props.saveMolecule(
      this.props.saved_mols,
      this.props.selected_r_groups,
      this.props.time
    );
    }
  };

  // set the first saved molecule as the selected molecule for the assay page
  initSelectMolecule = () => {
    this.props.selectMolecule(Object.keys(this.props.saved_mols)[0]);
    let game_data = JSON.stringify(compile_game_data(this.props.saved_mols, this.props.money, this.props.time, this.props.selected_mol))
    this.props.saveGame(game_data)
  };

    fetchSpider = () => {
      this.props.fetchSpiderObj();
  };

  // retrieve data for the comparison text on the results page
  fetchCompText = () => {
      this.props.fetchCompText();
  };

  resetRGroups = () => {
    this.props.selectRGroup('A00', 'B00', '500,500');
  }

  render() {

    if (this.props.saved_or_not == false) {
      return (
        <div className="control-panel">
          <button onClick={this.resetRGroups}>Clear</button>
          { (this.props.selected_r_groups.A == 'A00' || this.props.selected_r_groups.B == 'B00')? '' : <button onClick={this.saveMolecule}>Make</button>}
        </div>)
    }

    else {

      return (
        <div className="control-panel">
          <button onClick={this.resetRGroups}>Clear</button>
          { (this.props.selected_r_groups.A == 'A00' || this.props.selected_r_groups.B == 'B00')? '' : <button onClick={this.saveMolecule}>Make</button>}
          <Link to="/assay">
            <button onClick={this.initSelectMolecule}>Test →</button>
          </Link>
        </div>)
    }
  }        
}
function mapStateToProps(state) {
  return {
    selected_r_groups: state.selector.selected_r_groups,
    saved_mols: state.assay.saved_mols,
    saved_or_not: state.assay.saved_or_not,
    time: state.game.time,
    gamemode: state.game.gamemode,
    help: state.init.help.analysis,
    selected_mol: state.selector.selected_mol

  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
  saveMolecule: assayActions.saveMolecule,
  selectRGroup: selectorActions.selectRGroup,
  saveGame: gameActions.saveGame,

};

export default connect(mapStateToProps, actionCreators)(ControlPanel);
